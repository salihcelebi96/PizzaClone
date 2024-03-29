
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




export interface SepetData {
  _id: string;
  tür: string;
  fiyatlar: number,
  url: string;
}

export interface SepetState {
  items: SepetData[];
  ordered:SepetData[];
}

const initialState: SepetState = {
  items: [],
  ordered: [],
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
    emptySepet: (state) => {
      state.items = [];
    },
    pushToOrdered: (state,action:PayloadAction<SepetData[]>) => {
      state.ordered.push(...action.payload);
    }
  },
});

export const { pushNewItems, deleteItems,emptySepet,pushToOrdered } = sepetSlice.actions;

export default sepetSlice.reducer;
