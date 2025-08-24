import type { Transaction, User, Wallet } from "@/types";
import { api } from "./api";

interface AddMoneyRequest {
  amount: number;
}

interface SendMoneyRequest {
  receiverPhone: string;
  amount: number;
}

interface AgentTransactionRequest {
  userPhone: string;
  amount: number;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  type?: string;
  startDate?: string;
  endDate?: string;
}
interface CommissionTransaction {
  _id: string;
  type: "commission-earned";
  amount: number;
  description: string;
  createdAt: string;
  sender?: {
    name: string;
    phone: string;
  };
}

interface CommissionHistoryResponse {
  transactions: CommissionTransaction[];
}

export const walletApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query<{ balance: number }, void>({
      query: () => "/wallet/balance",
    }),
    addMoney: builder.mutation<Transaction, AddMoneyRequest>({
      query: (data) => ({
        url: "/wallet/top-up",
        method: "POST",
        body: data,
      }),
    }),
    withdrawMoney: builder.mutation<Transaction, AddMoneyRequest>({
      query: (data) => ({
        url: "/wallet/withdraw",
        method: "POST",
        body: data,
      }),
    }),
    sendMoney: builder.mutation<Transaction, SendMoneyRequest>({
      query: (data) => ({
        url: "/wallet/send-money",
        method: "POST",
        body: data,
      }),
    }),
    getTransaction: builder.query<Transaction[], PaginationParams>({
      query: (params) => ({
        url: "/wallet/transactions",
        params,
      }),
    }),

    // Agents

    cashIn: builder.mutation<Transaction, AgentTransactionRequest>({
      query: (data) => ({
        url: "/agent/cash-in",
        method: "POST",
        body: data,
      }),
    }),
    cashOut: builder.mutation<Transaction, AgentTransactionRequest>({
      query: (data) => ({
        url: "/agent/cash-out",
        method: "POST",
        body: data,
      }),
    }),
    getAgentTransactions: builder.query<Transaction[], PaginationParams>({
      query: (params) => ({
        url: "/agent/transactions",
        params,
      }),
    }),
    getCommissionHistory: builder.query<CommissionHistoryResponse, void>({
      query: () => "/agent/commissions",
      providesTags: ["Transaction"],
    }),
    // Admin
    getAllUsers: builder.query<{ data: User[] }, void>({
      query: () => "/admin/users",
      providesTags: ["User"],
    }),
    getAllAgents: builder.query<{ data: User[] }, void>({
      query: () => "/admin/agents",
      providesTags: ["User"],
    }),
    getAllTransactions: builder.query<
      { data: Transaction[] },
      PaginationParams
    >({
      query: (params) => ({
        url: "/admin/transactions",
        params,
      }),
      providesTags: ["Transaction"],
    }),
    getAllWallets: builder.query<{ data: Wallet[] }, void>({
      query: () => "/admin/wallets",
      providesTags: ["Wallet"],
    }),
    blockUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/user/block`,
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: ["User"],
    }),
    unblockUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/user/unblock`,
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: ["User"],
    }),
    suspendAgent: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/agent/suspend`,
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: ["Agent"],
    }),
    activateAgent: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/agent/activate`,
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: ["Agent"],
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useSendMoneyMutation,
  useGetTransactionQuery,
  useCashInMutation,
  useGetCommissionHistoryQuery,
  useCashOutMutation,
  useGetAgentTransactionsQuery,
  useGetAllUsersQuery,
  useGetAllAgentsQuery,
  useGetAllTransactionsQuery,
  useGetAllWalletsQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useSuspendAgentMutation,
  useActivateAgentMutation,
} = walletApi;
