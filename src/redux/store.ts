// rootReducer.ts
import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '../reducers/PizzaSlice';
import kampanyaSlice from '../reducers/kampanyaSlice';
import WingsSlice from '../reducers/WingsSlice';



const store = configureStore({
  reducer: {
   pizza:pizzaReducer,
   kampanya:kampanyaSlice,
   wings:WingsSlice
    
    
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;

