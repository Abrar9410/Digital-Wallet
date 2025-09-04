import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER", "USERS", "AGENT", "AGENT_REQUEST", "TRANSACTION"],
    }),

    changePassword: builder.mutation({
      query: (passwordInfo) => ({
        url: "/auth/change-password",
        method: "PATCH",
        data: passwordInfo
      })
    })
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation
} = authApi;
