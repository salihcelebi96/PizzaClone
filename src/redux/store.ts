// rootReducer.ts
import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '../reducers/PizzaSlice';
import kampanyaSlice from '../reducers/kampanyaSlice';
import WingsSlice from '../reducers/WingsSlice';
import IceceklerSlice from "../reducers/iceceklerSlice";
import tatlıSlice from '../reducers/tatlıSlice';
import loginSlice from '../reducers/loginSlice';
import sepetSlice from "../reducers/sepetSlice";



const store = configureStore({
  reducer: {
   pizza:pizzaReducer,
   kampanya:kampanyaSlice,
   wings:WingsSlice,
   icecekler:IceceklerSlice,
   tatlılar:tatlıSlice,
   login:loginSlice,
   sepet:sepetSlice, 
    
  },
});


export type RootState = ReturnType<typeof store.getState>;
export default store;

