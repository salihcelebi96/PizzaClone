import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface tatlıData {
  _id: string;
  tür: string;
  fiyat: number;
  url: string;
}

export interface tatlıState {
  tatlılar: tatlıData[]; 
}

const initialState: tatlıState = {
  tatlılar: [],
};

const TatlıSlice = createSlice({
  name: 'tatlılar',
  initialState,
  reducers: {
    pushNewTatlı: (state, action: PayloadAction<tatlıData[]>) => {  
      const newTatlı = action.payload.filter(newTatlı =>
        !state.tatlılar.some(existingTatlı => existingTatlı._id === newTatlı._id)
      );
      state.tatlılar.push(...newTatlı);
    },
  },
});

export const {  pushNewTatlı } = TatlıSlice.actions; 

export default TatlıSlice.reducer;
