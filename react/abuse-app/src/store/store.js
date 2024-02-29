import { configureStore } from "@reduxjs/toolkit";
import {reportApi} from "../services/AbuseReportService.js";

export const store = configureStore({
    reducer: {
        [reportApi.reducerPath]: reportApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reportApi.middleware),
});