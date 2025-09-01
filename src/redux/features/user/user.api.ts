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
        
        getAllUsers: builder.query({
            query: (params) => ({
                url: "/users/all-users",
                method: "GET",
                params
            }),
            providesTags: ["USER"],
        }),
        
        getUsers: builder.query({
            query: ({ searchTerm, agentStatus, activeStatus, page, limit }) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append("searchTerm", searchTerm);
                if (agentStatus) params.append("agentStatus", agentStatus);
                if (activeStatus) params.append("activeStatus", activeStatus);
                if (page) params.append("page", page);
                if (limit) params.append("limit", limit);

                return {
                    url: `/users/all-users?role=USER&${params}`,
                    method: "GET",
                };
            },
            providesTags: ["USERS"]
        }),
        
        getAgents: builder.query({
            query: ({ searchTerm, agentStatus, activeStatus, page, limit }) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append("searchTerm", searchTerm);
                if (agentStatus) params.append("agentStatus", agentStatus);
                if (activeStatus) params.append("activeStatus", activeStatus);
                if (page) params.append("page", page);
                if (limit) params.append("limit", limit);

                return {
                    url: `/users/all-users?role=AGENT&${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["AGENT"]
        }),
        
        getAgentRequests: builder.query({
            query: ({ searchTerm, activeStatus, page, limit }) => {
                const params = new URLSearchParams();
                if (searchTerm) params.append("searchTerm", searchTerm);
                if (activeStatus) params.append("activeStatus", activeStatus);
                if (page) params.append("page", page);
                if (limit) params.append("limit", limit);

                return {
                    url: `/users/agent-requests?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["AGENT_REQUEST"]
        }),

        updateUser: builder.mutation({
            query: ({userId, ...userInfo}) => ({
                url: `/users/update-user/${userId}`,
                method: "PATCH",
                data: userInfo
            }),
            invalidatesTags: ["USER", "AGENT"]
        }),
        
        blockUser: builder.mutation({
            query: (userId) => ({
                url: `/users/update-user/${userId}`,
                method: "PATCH",
                data: {activeStatus: "BLOCKED"}
            }),
            invalidatesTags: ["USER", "AGENT"]
        }),
        
        unblockUser: builder.mutation({
            query: (userId) => ({
                url: `/users/update-user/${userId}`,
                method: "PATCH",
                data: {activeStatus: "ACTIVE"}
            }),
            invalidatesTags: ["USER", "AGENT"]
        }),
        
        blockAgent: builder.mutation({
            query: (userId) => ({
                url: `/users/update-user/${userId}`,
                method: "PATCH",
                data: {activeStatus: "BLOCKED", agentStatus: "SUSPENDED"}
            }),
            invalidatesTags: ["AGENT"]
        }),
        
        unblockAgent: builder.mutation({
            query: (userId) => ({
                url: `/users/update-user/${userId}`,
                method: "PATCH",
                data: {activeStatus: "ACTIVE"}
            }),
            invalidatesTags: ["AGENT"]
        }),

        suspendAgent: builder.mutation({
            query: (agentId) => ({
                url: `/users/update-user/${agentId}`,
                method: "PATCH",
                data: {agentStatus: "SUSPENDED"}
            }),
            invalidatesTags: ["AGENT"]
        }),
        
        sendAgentRequest: builder.mutation({
            query: () => ({
                url: `/users/become-an-agent`,
                method: "PATCH",
            }),
            invalidatesTags: ["USER"]
        }),

        approveAgentRequest: builder.mutation({
            query: ( userId ) => ({
                url: `/users/agent-approval/${userId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["AGENT", "AGENT_REQUEST"]
        }),
        
        denyAgentRequest: builder.mutation({
            query: ( userId ) => ({
                url: `/users/agent-denial/${userId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["AGENT", "AGENT_REQUEST"]
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/update-user/${userId}`,
                method: "PATCH",
                data: { isDeleted: true }
            }),
            invalidatesTags: ["USER", "AGENT"]
        }),
    })
});


export const {
  useRegisterMutation,
  useUserInfoQuery,
  useGetAllUsersQuery,
  useGetUsersQuery,
  useGetAgentsQuery,
  useGetAgentRequestsQuery,
  useUpdateUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useBlockAgentMutation,
  useUnblockAgentMutation,
  useSendAgentRequestMutation,
  useApproveAgentRequestMutation,
  useDenyAgentRequestMutation,
  useSuspendAgentMutation,
  useDeleteUserMutation
} = userApi;