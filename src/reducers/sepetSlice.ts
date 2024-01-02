import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SepetData {
  _id: string;
  tür: string;
  fiyatlar: number;
  url: string;
}

export interface SepetState {
  items: SepetData[];
}

const initialState: SepetState = {
  items: [],
};

const sepetSlice = createSlice({
  name: 'sepet',
  initialState,
  reducers: {
    pushNewItems: (state, action: PayloadAction<SepetData[]>) => {
      const newItems = action.payload.filter(newItem =>
        !state.items.some(existingItem => existingItem._id === newItem._id)
      );
      state.items.push(...newItems);
    },
    deleteItems: (state, action: PayloadAction<string[]>) => {
      const idsToDelete = action.payload;
      state.items = state.items.filter(item => !idsToDelete.includes(item._id));
    },
  },
});

export const { pushNewItems, deleteItems } = sepetSlice.actions;

export default sepetSlice.reducer;
