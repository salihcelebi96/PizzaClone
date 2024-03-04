import { createSlice } from "@reduxjs/toolkit";


interface LoadingState {
    loading: boolean;
}

const initialState: LoadingState = {
    loading: false,
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        loadingTrue: (state) => {
            return { ...state, loading: true }; 
          },
          
          
        loadingFalse:(state) => {state.loading = false;
        }
    },
    
});


export const {loadingTrue, loadingFalse} = loadingSlice.actions;
export default loadingSlice.reducer