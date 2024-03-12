import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardInfo {
    cardNumber: string;
    name: string;
    month: string;
    years: string;
    cvc: string;
    cardName: string;
    activeUserEmail:string;
}

interface CardState {
    cards: CardInfo[];
}

const initialState: CardState = {
    cards: [],
};

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        addCard(state, action: PayloadAction<CardInfo>) {
            state.cards.push(action.payload);
        },
        updateCard(state, action: PayloadAction<{ index: number; cardInfo: CardInfo }>) {
            const { index, cardInfo } = action.payload;
            state.cards[index] = cardInfo;
        },
        removeCard(state, action: PayloadAction<number>) {
            state.cards.splice(action.payload, 1);
        },
    },
});

export const { addCard, updateCard, removeCard } = cardSlice.actions;
export default cardSlice.reducer;
