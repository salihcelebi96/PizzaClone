import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WingsData {
    id: string;
    tür: string;
    Açıklama: string;
    Fiyat: number;
    Url: string;
  }
  

interface WingsState {
  wings: WingsData[];
}

const initialState: WingsState = {
  wings: [],
};

const wingsSlice = createSlice({
  name: 'wings',
  initialState,
  reducers: {
    pushNewWings: (state, action: PayloadAction<WingsData>) => {
      const newWing = action.payload;

      
      const isDuplicate = state.wings.some(existingWing => existingWing.tür === newWing.tür);

      if (!isDuplicate) {
        state.wings.push(newWing);
      }
    },
  },
});

export const { pushNewWings } = wingsSlice.actions;
export default wingsSlice.reducer;
