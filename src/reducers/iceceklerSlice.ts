import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IceceklerData {
  _id: string;
  tür: string;
  fiyat: number;
  url: string;
}

export interface IceceklerState {
  icecekler: IceceklerData[];
}

const initialState: IceceklerState = {
  icecekler: [],
};

const IceceklerSlice = createSlice({
  name: 'icecekler', // Updated the name to 'icecekler'
  initialState,
  reducers: {
    pushNewIcecek: (state, action: PayloadAction<IceceklerData[]>) => { // Updated the action name to 'pushNewIcecek'
      const newIcecek = action.payload.filter(newIcecek =>
        !state.icecekler.some(existingIcecek => existingIcecek._id === newIcecek._id)
      );
      state.icecekler.push(...newIcecek);
    },
  },
});

export const { pushNewIcecek } = IceceklerSlice.actions; // Updated the action name to 'pushNewIcecek'

export default IceceklerSlice.reducer;
