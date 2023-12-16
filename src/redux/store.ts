// rootReducer.ts
import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '../reducers/PizzaSlice';
import kampanyaSlice from '../reducers/kampanyaSlice';
import WingsSlice from '../reducers/WingsSlice';
import IceceklerSlice from "../reducers/iceceklerSlice";
import tatlıSlice from '../reducers/tatlıSlice';



const store = configureStore({
  reducer: {
   pizza:pizzaReducer,
   kampanya:kampanyaSlice,
   wings:WingsSlice,
   icecekler:IceceklerSlice,
   tatlılar:tatlıSlice,
    
    
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;

