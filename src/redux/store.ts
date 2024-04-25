import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
} from "react-redux";
import { logger } from "redux-logger";
import { authReducer } from "~/redux/features/authSlice";

export const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
