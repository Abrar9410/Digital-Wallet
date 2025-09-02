import { baseApi } from "@/redux/baseApi";

export const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTransactions: builder.query({
            query: ({ searchTerm, type, sort, page, limit }) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append("searchTerm", searchTerm);
                if (type) params.append("type", type);
                if (sort) params.append("sort", sort);
                if (page) params.append("page", page);
                if (limit) params.append("limit", limit);

                return {
                    url: `/transactions/all-transactions?${params}`,
                    method: "GET",
                };
            },
            providesTags: ["TRANSACTION"],
        }),
        
        getMyTransactions: builder.query({
            query: (params) => ({
                url: "/transactions/my-transactions",
                method: "GET",
                params
            }),
            providesTags: ["TRANSACTION"],
        }),
        
        getSingleTransaction: builder.query({
            query: (id: string) => ({
                url: `/transactions/${id}`,
                method: "GET",
            }),
        }),
    })
});


export const {
    useGetAllTransactionsQuery,
    useGetMyTransactionsQuery,
    useGetSingleTransactionQuery
} = transactionApi;