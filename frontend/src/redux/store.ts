import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    cartSlice,
    authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
