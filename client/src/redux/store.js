import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';



const store = configureStore({
  reducer: {
    dogs: rootReducer,
  },
});

export default store;