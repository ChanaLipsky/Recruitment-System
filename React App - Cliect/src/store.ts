import { combineReducers } from '@reduxjs/toolkit';
import jobReducer from './features/job/jobSlice';
import candidateReducer from './features/candidate/candidateSlice';
import { configureStore,  } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const rootReducer = combineReducers({
  job: jobReducer,
  candidate: candidateReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch 
export default store