import { configureStore } from "@reduxjs/toolkit";
import {reportApi} from "../services/AbuseReportService.js";

export const store = configureStore({
    reducer: {
        [reportApi.reducerPath]: reportApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reportApi.middleware),
});