import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/users/register",
                method: "POST",
                data: userInfo,
            }),
        }),

        userInfo: builder.query({
            query: () => ({
                url: "/users/me",
                method: "GET",
            }),
            providesTags: ["USER"],
        }),

        updateUser: builder.mutation({
            query: ({userId, ...userInfo}) => ({
                url: `/users/update-user/${userId}`,
                method: "PATCH",
                data: userInfo
            }),
            invalidatesTags: ["USER"]
        })
    })
});


export const {
  useRegisterMutation,
  useUserInfoQuery,
  useUpdateUserMutation,
} = userApi;