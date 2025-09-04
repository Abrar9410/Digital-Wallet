import { baseApi } from "@/redux/baseApi";

export const walletApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyWallet: builder.query({
            query: () => ({
                url: "/wallets/my-wallet",
                method: "GET",
            }),
            providesTags: ["WALLET"],
        }),

        // topUp: builder.mutation({
        //     query: (info: {amount: number}) => ({
        //         url: "/wallets/top-up",
        //         method: "PATCH",
        //         data: info
        //     }),
        //     invalidatesTags: ["WALLET"]
        // }),

        depositMoney: builder.mutation({
            query: (info: {agentEmail: string, amount: number}) => ({
                url: "/wallets/deposit",
                method: "PATCH",
                data: info
            }),
            invalidatesTags: ["WALLET"]
        }),
        
        withdrawMoney: builder.mutation({
            query: (info: {agentEmail: string, amount: number}) => ({
                url: "/wallets/withdraw",
                method: "PATCH",
                data: info
            }),
            invalidatesTags: ["WALLET"]
        }),
        
        sendMoney: builder.mutation({
            query: (info: {receiverEmail: string, amount: number}) => ({
                url: "/wallets/send-money",
                method: "PATCH",
                data: info
            }),
            invalidatesTags: ["WALLET"]
        }),
        
        cashIn: builder.mutation({
            query: (info: {userEmail: string, amount: number}) => ({
                url: "/wallets/cash-in",
                method: "PATCH",
                data: info
            }),
            invalidatesTags: ["WALLET"]
        }),
        
        cashOut: builder.mutation({
            query: (info: {userEmail: string, amount: number}) => ({
                url: "/wallets/cash-out",
                method: "PATCH",
                data: info
            }),
            invalidatesTags: ["WALLET"]
        }),
    })
});


export const {
    useGetMyWalletQuery,
    useDepositMoneyMutation,
    useWithdrawMoneyMutation,
    useSendMoneyMutation,
    useCashInMutation,
    useCashOutMutation
} = walletApi;