// rootReducer.ts
import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '../reducers/PizzaSlice';
import kampanyaSlice from '../reducers/kampanyaSlice';
import WingsSlice from '../reducers/WingsSlice';
import YanSlice from "../reducers/yanurunSlice";



const store = configureStore({
  reducer: {
   pizza:pizzaReducer,
   kampanya:kampanyaSlice,
   wings:WingsSlice,
   Yanurun:YanSlice,
    
    
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;

