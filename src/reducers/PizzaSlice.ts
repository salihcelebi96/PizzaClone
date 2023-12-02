import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IDataItem {
  _id: string;
  tür: string;
  fiyatlar: {
    büyük: number;
    orta: number;
    küçük: number;
  };
  url: string;
}

export interface PizzaState {
  pizzas: IDataItem[]
  
}

const initialState: PizzaState = {
  pizzas: []
  
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    pushNewPizzas: (state, action: PayloadAction<IDataItem[]>) => {
      const newPizzas = action.payload.filter(newPizza => 
        !state.pizzas.some(existingPizza => existingPizza._id === newPizza._id)
      );
      state.pizzas.push(...newPizzas);
    },
  },
});

export const { pushNewPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
