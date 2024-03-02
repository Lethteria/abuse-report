import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../constants/constants.js";
import {mapResponseData} from "../helpers/mapResponseData.js";

export const reportApi = createApi({
    reducerPath: "reportApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ["Report"],
    endpoints: (build) => ({
        getReportsList: build.query({
            query: (clientToken) => ({
                url: "abuse-reports",
                params: {
                    clientToken: clientToken
                }
            }),
            transformResponse: (response, meta, arg) => mapResponseData(response),
            providesTags: result => ["Report"],
            keepUnusedDataFor: 60*60*24,
        }),
        sendReport: build.mutation({
            query: (report) => ({
                url: "abuse-report",
                method: "POST",
                body: report
            }),
            invalidatesTags: ["Report"],
        })
    }),
})

export const { useGetReportsListQuery, useSendReportMutation } = reportApi;