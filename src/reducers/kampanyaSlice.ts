import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface KampanyaData {
  _id: string;
  tür: string;
  fiyat:number;
  url: string;
}

export interface KampanyaState {
  kampanya: KampanyaData[]
  
}

const initialState: KampanyaState = {
  kampanya: []
  
};

const kampanyaSlice = createSlice({
  name: 'kampanya',
  initialState,
  reducers: {
    pushNewKampanya: (state, action: PayloadAction<KampanyaData[]>) => {
      const newkampanya = action.payload.filter(newkampanya =>
        !state.kampanya.some(existingKampanya => existingKampanya._id === newkampanya._id)
      );
      state.kampanya.push(...newkampanya);
    },
  },
});

export const { pushNewKampanya } = kampanyaSlice.actions;

export default kampanyaSlice.reducer;

