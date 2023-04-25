import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook,
} from 'react-redux';

const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: isDevelopment,
});

export type StoreType = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const useDispatch = useReduxDispatch<RootDispatch>;
export const useSelector: TypedUseSelectorHook<StoreType> = useReduxSelector;

export default store;
