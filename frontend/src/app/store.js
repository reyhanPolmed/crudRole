import { configureStore } from '@reduxjs/toolkit';
import auhtReducer from '../features/AuthSlice.js'


export const store = configureStore({
  reducer: {
    auth : auhtReducer
  },
});
