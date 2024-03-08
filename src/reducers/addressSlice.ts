import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
    city: string;
    district: string;
    neighborhood: string;
    street: string;
    addressName: string;
    addressDetails: string;
    userEmail:string;
}

interface AddressState {
    addresses: Address[]; 
}

const initialState: AddressState = {
    addresses: [],
};

const addressSlice = createSlice({
    name: "Address",
    initialState,
    reducers: {
        addAddress: (state, action: PayloadAction<Address>) => {
            state.addresses.push(action.payload); 
        },
        updateAddress: (state, action: PayloadAction<{ index: number, address: Address }>) => {
            state.addresses[action.payload.index] = action.payload.address; 
        },
        deleteAddress: (state, action: PayloadAction<number>) => {
            state.addresses.splice(action.payload, 1); 
        }
    }
});

export const { addAddress, updateAddress, deleteAddress } = addressSlice.actions;
export default addressSlice.reducer;
