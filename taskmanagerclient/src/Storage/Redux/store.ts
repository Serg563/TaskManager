import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "./userAuthSlice";
import { authApi, developerApi, taskApi } from "../../API";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { userModel } from "../../Interfaces";

const userDataPersistConfig = {
  key: "userAuthStore",
  storage: storage,
};

const store = configureStore({
  reducer: {
    userAuthStore: persistReducer<userModel, any>(
      userDataPersistConfig,
      userAuthReducer as any
    ),

    [authApi.reducerPath]: authApi.reducer,
    [developerApi.reducerPath]: developerApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(developerApi.middleware)
      .concat(taskApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
