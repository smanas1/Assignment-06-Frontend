import type { User } from "@/types";
import { api } from "./api";

interface LoginRequest {
  phone: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  phone: string;
  password: string;
  role: "user" | "agent";
}

interface AuthResponse {
  user: User;
  token?: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query<AuthResponse, void>({
      query: () => "/auth/me",
      providesTags: (result) => [
        { type: "User", id: result?.user?._id || "CURRENT_USER" },
      ],
    }),
    updateProfile: builder.mutation<AuthResponse, { name: string }>({
      query: (data) => ({
        url: "/auth/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result) => [
        { type: "User", id: result?.user?._id || "CURRENT_USER" },
        "User",
      ],
    }),
    changePassword: builder.mutation<
      void,
      {
        currentPassword?: string;
        newPassword: string;
      }
    >({
      query: (data) => ({
        url: "/auth/password",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    adminUpdateUser: builder.mutation<
      User,
      {
        userId: string;
        name?: string;
        phone?: string;
        role?: string;
      }
    >({
      query: ({ userId, ...data }) => ({
        url: `/admin/user/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: "User", id: userId },
        "User",
      ],
    }),
    adminChangeUserPassword: builder.mutation<
      void,
      {
        userId: string;
        newPassword: string;
      }
    >({
      query: ({ userId, newPassword }) => ({
        url: `/admin/user/${userId}/password`,
        method: "PUT",
        body: { newPassword },
      }),
      invalidatesTags: (_result, _error, { userId }) => [
        { type: "User", id: userId },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useAdminUpdateUserMutation,
  useAdminChangeUserPasswordMutation,
} = authApi;
