import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface YanData {
  _id: string;
  tür: string;
  fiyat: number; // Corrected the type from 'Number' to 'number'
  url: string;
}

export interface YanUrunState {
  yanuruns: YanData[];
}

const initialState: YanUrunState = {
  yanuruns: [],
};

const YanurunSlice = createSlice({
  name: 'yanurun',
  initialState,
  reducers: {
    pushNewYanUrun: (state, action: PayloadAction<YanData[]>) => {
      const newYanurun = action.payload.filter(newYanurun =>
        !state.yanuruns.some(existingYanurun => existingYanurun._id === newYanurun._id)
      );
      state.yanuruns.push(...newYanurun);
    },
  },
});

export const { pushNewYanUrun } = YanurunSlice.actions;

export default YanurunSlice.reducer;
