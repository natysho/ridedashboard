import { configureStore } from "@reduxjs/toolkit";
import { dashboardApiService } from "./dashboardApi";

export const store = configureStore({
    reducer: {
        [dashboardApiService.reducerPath]: dashboardApiService.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dashboardApiService.middleware)

})

export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch