import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../app/constants.js";

export const reportApi = createApi({
    reducerPath: "reportApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getReportsList: build.query({
            query: (clientToken) => ({
                url: "abuse-reports",
                params: {
                    clientToken: clientToken
                }
            }),
            keepUnusedDataFor: 60*60,
        }),
        sendReport: build.mutation({
            query: (report) => ({
                url: "abuse-report",
                method: "POST",
                body: report
            }),
        })
    }),
})

export const { useGetReportsListQuery, useSendReportMutation } = reportApi;