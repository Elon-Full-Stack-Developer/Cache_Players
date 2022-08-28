import { configureStore } from '@reduxjs/toolkit';
import PlayerReducer from './PlayerReducer';

export const store = configureStore({
  reducer: {
    PLAYER: PlayerReducer,
  },
})