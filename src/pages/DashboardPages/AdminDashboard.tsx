/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/admin/AdminDashboard.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "@/hooks";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Users,
  Store,
  DollarSign,
  TrendingUp,
  User,
  LogOut,
  Search,
  Eye,
  Ban,
  CheckCircle,
  BarChart3,
  PieChart,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useActivateAgentMutation,
  useBlockUserMutation,
  useGetAllAgentsQuery,
  useGetAllTransactionsQuery,
  useGetAllUsersQuery,
  useGetAllWalletsQuery,
  useSuspendAgentMutation,
  useUnblockUserMutation,
} from "@/services/wallet";
// Chart components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";
// Define TypeScript interfaces
interface User {
  wallet: any;
  _id: string;
  name: string;
  phone: string;
  role: string;
  isBlocked: boolean;
  createdAt: string;
}

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // RTK Query hooks
  const {
    data: usersData,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetAllUsersQuery();
  const {
    data: agentsData,
    isLoading: agentsLoading,
    refetch: refetchAgents,
  } = useGetAllAgentsQuery();
  const { data: walletsData, isLoading: walletsLoading } =
    useGetAllWalletsQuery();
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetAllTransactionsQuery({});
  // Mutation hooks
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [suspendAgent] = useSuspendAgentMutation();
  const [activateAgent] = useActivateAgentMutation();
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7"); // 7 days by default
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userStatusFilter, setUserStatusFilter] = useState<
    "all" | "active" | "blocked"
  >("all");
  const [minAmountFilter, setMinAmountFilter] = useState<string>("");
  const [maxAmountFilter, setMaxAmountFilter] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    userId: "",
    action: "",
    userName: "",
  });
  // --- ADD PAGINATION STATES ---
  const [transactionCurrentPage, setTransactionCurrentPage] = useState(1);
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const [walletSearchTerm, setWalletSearchTerm] = useState("");
  const [transactionSearchTerm, setTransactionSearchTerm] = useState("");
  const [walletCurrentPage, setWalletCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  // Extract data
  const users = usersData?.data ?? [];
  const agents = agentsData?.data ?? [];
  const wallets = walletsData?.data ?? [];
  const transactions = transactionsData?.data ?? [];
  // Filtered data
  const filteredUsers = users.filter((user) => {
    // Existing Search Filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    // Existing Role Filter
    const matchesRole =
      userRoleFilter === "all" || user.role === userRoleFilter;

    // --- NEW: Status Filter ---
    let matchesStatus = true;
    if (userStatusFilter === "active") {
      matchesStatus = !user.isBlocked; // Active means NOT blocked
    } else if (userStatusFilter === "blocked") {
      matchesStatus = user.isBlocked;
    }
    // If userStatusFilter === "all", matchesStatus remains true

    // --- NEW: Amount Filter (assuming user has a wallet with balance) ---
    let matchesAmount = true;
    const userBalance =
      typeof user.wallet === "object" &&
      user.wallet !== null &&
      "balance" in user.wallet
        ? (user.wallet as { balance: number }).balance
        : 0; // Safely get balance or default to 0

    const minAmountNum =
      minAmountFilter !== "" ? parseFloat(minAmountFilter) : -Infinity;
    const maxAmountNum =
      maxAmountFilter !== "" ? parseFloat(maxAmountFilter) : Infinity;

    // Only apply numeric filters if parsing was successful
    if (!isNaN(minAmountNum) && !isNaN(maxAmountNum)) {
      matchesAmount =
        userBalance >= minAmountNum && userBalance <= maxAmountNum;
    } else if (!isNaN(minAmountNum)) {
      matchesAmount = userBalance >= minAmountNum;
    } else if (!isNaN(maxAmountNum)) {
      matchesAmount = userBalance <= maxAmountNum;
    }

    // Combine all filters with AND logic
    return matchesSearch && matchesRole && matchesStatus && matchesAmount;
  });

  const filteredTransactions = transactions.filter((transaction) => {
    // Apply date range filter
    const transactionDate = new Date(transaction.createdAt);
    const now = new Date();
    let daysToSubtract = 7;
    if (dateRange === "1") {
      daysToSubtract = 1;
    } else if (dateRange === "30") {
      daysToSubtract = 30;
    } else if (dateRange === "90") {
      daysToSubtract = 90;
    }
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - daysToSubtract);
    const isWithinDateRange = transactionDate >= startDate;
    // Apply type filter
    const matchesType =
      transactionTypeFilter === "all" ||
      transaction.type === transactionTypeFilter;
    return isWithinDateRange && matchesType;
  });
  // --- PAGINATION LOGIC FOR TRANSACTIONS ---

  // --- PAGINATION LOGIC FOR USERS ---
  const userIndexOfLastItem = userCurrentPage * itemsPerPage;
  const userIndexOfFirstItem = userIndexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(
    userIndexOfFirstItem,
    userIndexOfLastItem
  );
  const userTotalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // --- PAGINATION LOGIC FOR WALLETS ---

  const handlePageChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    pageNumber: number
  ) => {
    setter(pageNumber);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully");
  };
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserDetails(true);
  };
  const handleUserAction = (
    userId: string,
    action: string,
    userName: string
  ) => {
    setConfirmationData({ userId, action, userName });
    setShowConfirmation(true);
  };
  const confirmUserAction = async () => {
    try {
      if (confirmationData.action === "block") {
        await blockUser(confirmationData.userId).unwrap();
        toast.success(`User ${confirmationData.userName} blocked successfully`);
      } else if (confirmationData.action === "unblock") {
        await unblockUser(confirmationData.userId).unwrap();
        toast.success(
          `User ${confirmationData.userName} unblocked successfully`
        );
      } else if (confirmationData.action === "suspend") {
        await suspendAgent(confirmationData.userId).unwrap();
        toast.success(
          `Agent ${confirmationData.userName} suspended successfully`
        );
      } else if (confirmationData.action === "activate") {
        await activateAgent(confirmationData.userId).unwrap();
        toast.success(
          `Agent ${confirmationData.userName} activated successfully`
        );
      }
      // Refetch data after action
      refetchUsers();
      refetchAgents();
    } catch (err: any) {
      toast.error(err.data?.message || "Action failed");
    } finally {
      setShowConfirmation(false);
    }
  };
  // Calculate statistics
  const totalUsers = users.length;
  const totalAgents = agents.length;
  const totalTransactions = transactions.length;

  const totalTransactionVolume: number = transactions.reduce(
    (sum: number, t: any) => sum + t.amount,
    0
  );
  // Calculate active users and agents
  interface ActiveUser {
    wallet: any;
    _id: string;
    name: string;
    phone: string;
    role: string;
    isBlocked: boolean;
    createdAt: string;
  }

  const activeUsers: number = users.filter(
    (u: ActiveUser) => !u.isBlocked
  ).length;
  interface Agent {
    _id: string;
    name: string;
    phone: string;
    role: string;
    isBlocked: boolean;
    createdAt: string;
    // Add other agent-specific fields if needed
  }

  const activeAgents: number = agents.filter((a: Agent) => !a.isBlocked).length;
  // Prepare data for charts
  // Transaction volume by type
  const transactionVolumeByType = filteredTransactions.reduce(
    (acc: Record<string, number>, transaction: any) => {
      const type = transaction.type;
      acc[type] = (acc[type] || 0) + transaction.amount;
      return acc;
    },
    {}
  );
  const transactionVolumeChartData = Object.entries(
    transactionVolumeByType
  ).map(([type, amount]) => ({
    name: type.replace("-", " "),
    value: amount,
  }));
  // Transactions over time (last 7 days)
  const transactionsOverTime = (() => {
    const now = new Date();
    const dates = [];
    const transactionCounts: Record<string, number> = {};
    const transactionVolumes: Record<string, number> = {};
    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];
      dates.push(dateStr);
      transactionCounts[dateStr] = 0;
      transactionVolumes[dateStr] = 0;
    }
    // Count transactions for each day
    filteredTransactions.forEach((transaction) => {
      const dateStr = transaction.createdAt.split("T")[0];
      if (Object.prototype.hasOwnProperty.call(transactionCounts, dateStr)) {
        transactionCounts[dateStr] += 1;
        transactionVolumes[dateStr] += transaction.amount;
      }
    });
    return dates.map((date) => ({
      date,
      transactions: transactionCounts[date],
      volume: transactionVolumes[date],
    }));
  })();
  // User distribution by role
  const userDistribution = [
    { name: "Users", value: totalUsers - totalAgents },
    { name: "Agents", value: totalAgents },
  ];
  // COLORS for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage users, agents, and system transactions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/admin/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {usersLoading ? (
                  <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  totalUsers
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {activeUsers} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Agents
              </CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {agentsLoading ? (
                  <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  activeAgents
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalAgents} total
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transactions
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {transactionsLoading ? (
                  <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  totalTransactions
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                System transactions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transaction Volume
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {transactionsLoading ? (
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  `৳${totalTransactionVolume.toLocaleString()}`
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total processed
              </p>
            </CardContent>
          </Card>
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Transaction Volume by Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Transaction Volume by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="h-64 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={transactionVolumeChartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`৳${value}`, "Volume"]} />
                      <Legend />
                      <Bar dataKey="value" name="Volume (৳)" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
          {/* User Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                User Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {usersLoading || agentsLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="h-64 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={userDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                      >
                        {userDistribution.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [value, "Count"]} />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Transactions Over Time Chart */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Transactions Over Time
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Last 24 hours</SelectItem>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="h-64 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              ) : (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={transactionsOverTime}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === "transactions") {
                            return [value, "Transactions"];
                          }
                          return [`৳${value}`, "Volume"];
                        }}
                      />
                      <Legend />
                      <Bar
                        yAxisId="left"
                        dataKey="transactions"
                        name="Transactions"
                        fill="#8884d8"
                      />
                      <Bar
                        yAxisId="right"
                        dataKey="volume"
                        name="Volume (৳)"
                        fill="#82ca9d"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Users Management WITH PAGINATION AND IMPROVED RESPONSIVENESS */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  User Management
                </div>
                {/* Wrap all filters in a single flex container for better control */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8 w-full sm:w-48 md:w-56" // Slightly reduced width
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Role Filter */}
                  <Select
                    value={userRoleFilter}
                    onValueChange={setUserRoleFilter}
                  >
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="user">Users</SelectItem>
                      <SelectItem value="agent">Agents</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Status Filter */}
                  <Select
                    value={userStatusFilter}
                    onValueChange={(value) =>
                      setUserStatusFilter(value as "all" | "active" | "blocked")
                    } // Type assertion
                  >
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Amount Range Filters */}
                  <div className="flex items-center gap-1 w-full sm:w-auto">
                    <Input
                      type="number"
                      placeholder="Min ৳"
                      className="w-full sm:w-24 text-sm"
                      value={minAmountFilter}
                      onChange={(e) => setMinAmountFilter(e.target.value)}
                    />
                    <span className="text-muted-foreground mx-1">-</span>
                    <Input
                      type="number"
                      placeholder="Max ৳"
                      className="w-full sm:w-24 text-sm"
                      value={maxAmountFilter}
                      onChange={(e) => setMaxAmountFilter(e.target.value)}
                    />
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <>
                  <div className="rounded-md border overflow-x-auto">
                    {/* Allow horizontal scroll on small screens */}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-left">Name</TableHead>
                          <TableHead className="text-left hidden md:table-cell">
                            Phone
                          </TableHead>
                          {/* Hide on small screens */}
                          <TableHead className="text-left">Role</TableHead>
                          <TableHead className="text-left">Status</TableHead>
                          <TableHead className="text-left hidden sm:table-cell">
                            Balance
                          </TableHead>
                          {/* Hide on extra small screens */}
                          <TableHead className="text-left hidden lg:table-cell">
                            Created
                          </TableHead>
                          {/* Hide on smaller screens */}
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentUsers.length > 0 ? (
                          currentUsers.map((user: User) => (
                            <TableRow key={user._id} className="border-b">
                              <TableCell className="font-medium">
                                <div>
                                  <div className="font-medium">{user.name}</div>
                                  {/* Show phone on small screens within the row */}
                                  <div className="md:hidden text-sm text-muted-foreground mt-1">
                                    {user.phone}
                                  </div>
                                  {/* Show date on small screens within the row */}
                                  <div className="lg:hidden text-xs text-muted-foreground mt-1">
                                    {new Date(
                                      user.createdAt
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {user.phone}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 capitalize rounded-full text-xs ${
                                    user.role === "agent"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                                      : user.role === "admin"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                      : "bg-gray-100 text-gray-800 dark:bg-sky-700 dark:text-gray-100"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    user.isBlocked
                                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                      : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                  }`}
                                >
                                  {user.isBlocked ? "Blocked" : "Active"}
                                </span>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell">
                                <span className="font-medium text-green-500">
                                  ৳{user.wallet?.balance?.toFixed(2) ?? "0.00"}
                                </span>
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleViewUser(user)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  {user.role === "agent" ? (
                                    user.isBlocked ? (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleUserAction(
                                            user._id,
                                            "activate",
                                            user.name
                                          )
                                        }
                                      >
                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleUserAction(
                                            user._id,
                                            "suspend",
                                            user.name
                                          )
                                        }
                                      >
                                        <Ban className="h-4 w-4 text-red-500" />
                                      </Button>
                                    )
                                  ) : user.isBlocked ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleUserAction(
                                          user._id,
                                          "unblock",
                                          user.name
                                        )
                                      }
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        handleUserAction(
                                          user._id,
                                          "block",
                                          user.name
                                        )
                                      }
                                    >
                                      <Ban className="h-4 w-4 text-red-500" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={7} // Updated colspan
                              className="text-center py-8 text-muted-foreground"
                            >
                              No users found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination Controls for Users */}
                  {filteredUsers.length > itemsPerPage && (
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {userIndexOfFirstItem + 1} to{" "}
                        {Math.min(userIndexOfLastItem, filteredUsers.length)} of{" "}
                        {filteredUsers.length} users
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePageChange(
                              setUserCurrentPage,
                              userCurrentPage - 1
                            )
                          }
                          disabled={userCurrentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {/* Simple pagination - show first, current, last */}
                        {userTotalPages > 1 && (
                          <>
                            {userCurrentPage > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePageChange(setUserCurrentPage, 1)
                                }
                              >
                                1
                              </Button>
                            )}
                            {userCurrentPage > 2 && <span>...</span>}
                            <Button
                              variant="default"
                              size="sm"
                              // No onClick needed, it's the current page
                            >
                              {userCurrentPage}
                            </Button>
                            {userCurrentPage < userTotalPages - 1 && (
                              <span>...</span>
                            )}
                            {userCurrentPage < userTotalPages && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePageChange(
                                    setUserCurrentPage,
                                    userTotalPages
                                  )
                                }
                              >
                                {userTotalPages}
                              </Button>
                            )}
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePageChange(
                              setUserCurrentPage,
                              userCurrentPage + 1
                            )
                          }
                          disabled={userCurrentPage === userTotalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Transactions Overview with Pagination */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recent Transactions
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  {/* Simple Search Filter */}
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-8 w-full sm:w-64 md:w-80"
                      value={transactionSearchTerm}
                      onChange={(e) => setTransactionSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* Keep existing type filter */}
                  <Select
                    value={transactionTypeFilter}
                    onValueChange={setTransactionTypeFilter}
                  >
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="top-up">Add Money</SelectItem>
                      <SelectItem value="withdraw">Withdraw</SelectItem>
                      <SelectItem value="send-money">Send Money</SelectItem>
                      <SelectItem value="receive">Receive Money</SelectItem>
                      <SelectItem value="cash-in">Cash-In</SelectItem>
                      <SelectItem value="cash-out">Cash-Out</SelectItem>
                      <SelectItem value="commission-earned">
                        Commission
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactionsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {/* Filtered Transactions Data and Pagination */}
                  {(() => {
                    // Apply filters to transactions data
                    const filteredTransactionsData = transactions.filter(
                      (transaction: any) => {
                        // Existing date range filter
                        const transactionDate = new Date(transaction.createdAt);
                        const now = new Date();
                        let daysToSubtract = 7;
                        if (dateRange === "1") {
                          daysToSubtract = 1;
                        } else if (dateRange === "30") {
                          daysToSubtract = 30;
                        } else if (dateRange === "90") {
                          daysToSubtract = 90;
                        }
                        const startDate = new Date(now);
                        startDate.setDate(now.getDate() - daysToSubtract);
                        const isWithinDateRange = transactionDate >= startDate;

                        // Existing type filter
                        const matchesType =
                          transactionTypeFilter === "all" ||
                          transaction.type === transactionTypeFilter;

                        // New search filter
                        const matchesSearch =
                          transaction.type
                            .toLowerCase()
                            .includes(transactionSearchTerm.toLowerCase()) ||
                          (transaction.sender?.name
                            ?.toLowerCase()
                            .includes(transactionSearchTerm.toLowerCase()) ??
                            false) ||
                          (transaction.sender?.phone
                            ?.toLowerCase()
                            .includes(transactionSearchTerm.toLowerCase()) ??
                            false) ||
                          (transaction.receiver?.name
                            ?.toLowerCase()
                            .includes(transactionSearchTerm.toLowerCase()) ??
                            false) ||
                          (transaction.receiver?.phone
                            ?.toLowerCase()
                            .includes(transactionSearchTerm.toLowerCase()) ??
                            false) ||
                          transaction.amount
                            .toString()
                            .includes(transactionSearchTerm);

                        return (
                          isWithinDateRange && matchesType && matchesSearch
                        );
                      }
                    );

                    // --- PAGINATION LOGIC FOR TRANSACTIONS (updated to use filtered data) ---
                    const transactionIndexOfLastItem =
                      transactionCurrentPage * itemsPerPage;
                    const transactionIndexOfFirstItem =
                      transactionIndexOfLastItem - itemsPerPage;
                    const currentTransactionsFiltered =
                      filteredTransactionsData.slice(
                        transactionIndexOfFirstItem,
                        transactionIndexOfLastItem
                      );
                    const transactionTotalPagesFiltered = Math.ceil(
                      filteredTransactionsData.length / itemsPerPage
                    );

                    return (
                      <>
                        <div className="rounded-md border overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Sender</TableHead>
                                <TableHead>Receiver</TableHead>
                                <TableHead>Date</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {currentTransactionsFiltered.length > 0 ? (
                                currentTransactionsFiltered.map(
                                  (transaction: any) => (
                                    <TableRow key={transaction._id}>
                                      <TableCell>
                                        <span className="capitalize">
                                          {transaction.type.replace("-", " ")}
                                        </span>
                                      </TableCell>
                                      <TableCell
                                        className={`font-medium ${
                                          transaction.type.includes("send") ||
                                          transaction.type.includes(
                                            "withdraw"
                                          ) ||
                                          transaction.type.includes("cash-out")
                                            ? "text-red-500"
                                            : "text-green-500"
                                        }`}
                                      >
                                        {transaction.type.includes("send") ||
                                        transaction.type.includes("withdraw") ||
                                        transaction.type.includes("cash-out")
                                          ? "-"
                                          : "+"}
                                        ৳{transaction.amount.toFixed(2)}
                                      </TableCell>
                                      <TableCell>
                                        {transaction.sender
                                          ? `${transaction.sender.name} (${transaction.sender.phone})`
                                          : "System"}
                                      </TableCell>
                                      <TableCell>
                                        {transaction.receiver
                                          ? `${transaction.receiver.name} (${transaction.receiver.phone})`
                                          : "System"}
                                      </TableCell>
                                      <TableCell>
                                        {new Date(
                                          transaction.createdAt
                                        ).toLocaleString()}
                                      </TableCell>
                                    </TableRow>
                                  )
                                )
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={5}
                                    className="text-center py-8 text-muted-foreground"
                                  >
                                    No transactions found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>

                        {/* Pagination Controls for Transactions (updated to use filtered data) */}
                        {filteredTransactionsData.length > itemsPerPage && (
                          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                            <div className="text-sm text-muted-foreground">
                              Showing {transactionIndexOfFirstItem + 1} to{" "}
                              {Math.min(
                                transactionIndexOfLastItem,
                                filteredTransactionsData.length
                              )}{" "}
                              of {filteredTransactionsData.length} transactions
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePageChange(
                                    setTransactionCurrentPage,
                                    transactionCurrentPage - 1
                                  )
                                }
                                disabled={transactionCurrentPage === 1}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              {[...Array(transactionTotalPagesFiltered)].map(
                                (_, i) => (
                                  <Button
                                    key={i}
                                    variant={
                                      transactionCurrentPage === i + 1
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() =>
                                      handlePageChange(
                                        setTransactionCurrentPage,
                                        i + 1
                                      )
                                    }
                                  >
                                    {i + 1}
                                  </Button>
                                )
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePageChange(
                                    setTransactionCurrentPage,
                                    transactionCurrentPage + 1
                                  )
                                }
                                disabled={
                                  transactionCurrentPage ===
                                  transactionTotalPagesFiltered
                                }
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Wallets Overview WITH PAGINATION */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Wallet Overview
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  {/* Filter Input - Similar to User Management */}
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search wallets..."
                      className="pl-8 w-full sm:w-64 md:w-80"
                      value={walletSearchTerm}
                      onChange={(e) => setWalletSearchTerm(e.target.value)}
                    />
                  </div>
                  {/* Placeholder for potential future filters (e.g., Balance Range) */}
                  {/* <div className="w-full sm:w-auto">
                   <Select>
                     <SelectTrigger className="w-full sm:w-40">
                       <SelectValue placeholder="Filter by..." />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="all">All Wallets</SelectItem>
                       <SelectItem value="high-balance">High Balance</SelectItem>
                       <SelectItem value="low-balance">Low Balance</SelectItem>
                     </SelectContent>
                   </Select>
                 </div> */}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {walletsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {/* Filtered Wallets Data */}
                  {(() => {
                    // Apply filters to wallets data
                    const filteredWallets = wallets.filter((wallet: any) => {
                      const matchesSearch =
                        wallet.owner.name
                          .toLowerCase()
                          .includes(walletSearchTerm.toLowerCase()) ||
                        wallet.owner.phone.includes(walletSearchTerm) ||
                        wallet._id
                          .toLowerCase()
                          .includes(walletSearchTerm.toLowerCase());
                      // Add more filter conditions here if needed (e.g., balance range)
                      // const matchesBalanceRange = ...;
                      return matchesSearch; // && matchesOtherFilters...
                    });

                    // --- PAGINATION LOGIC FOR WALLETS (updated to use filtered data) ---
                    const walletIndexOfLastItem =
                      walletCurrentPage * itemsPerPage;
                    const walletIndexOfFirstItem =
                      walletIndexOfLastItem - itemsPerPage;
                    const currentWallets = filteredWallets.slice(
                      walletIndexOfFirstItem,
                      walletIndexOfLastItem
                    );
                    const walletTotalPages = Math.ceil(
                      filteredWallets.length / itemsPerPage
                    );

                    return (
                      <>
                        <div className="rounded-md border overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Owner</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Balance</TableHead>
                                <TableHead>Created</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {currentWallets.length > 0 ? (
                                currentWallets.map((wallet: any) => (
                                  <TableRow key={wallet._id}>
                                    <TableCell className="font-medium">
                                      {wallet.owner.name}
                                    </TableCell>
                                    <TableCell>{wallet.owner.phone}</TableCell>
                                    <TableCell className="font-medium">
                                      ৳{wallet.balance.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                      {new Date(
                                        wallet.createdAt
                                      ).toLocaleDateString()}
                                    </TableCell>
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={4}
                                    className="text-center py-8 text-muted-foreground"
                                  >
                                    No wallets found
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>

                        {/* Pagination Controls for Wallets (updated to use filtered data) */}
                        {filteredWallets.length > itemsPerPage && (
                          <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                            <div className="text-sm text-muted-foreground">
                              Showing {walletIndexOfFirstItem + 1} to{" "}
                              {Math.min(
                                walletIndexOfLastItem,
                                filteredWallets.length
                              )}{" "}
                              of {filteredWallets.length} wallets
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePageChange(
                                    setWalletCurrentPage,
                                    walletCurrentPage - 1
                                  )
                                }
                                disabled={walletCurrentPage === 1}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              {[...Array(walletTotalPages)].map((_, i) => (
                                <Button
                                  key={i}
                                  variant={
                                    walletCurrentPage === i + 1
                                      ? "default"
                                      : "outline"
                                  }
                                  size="sm"
                                  onClick={() =>
                                    handlePageChange(
                                      setWalletCurrentPage,
                                      i + 1
                                    )
                                  }
                                >
                                  {i + 1}
                                </Button>
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePageChange(
                                    setWalletCurrentPage,
                                    walletCurrentPage + 1
                                  )
                                }
                                disabled={
                                  walletCurrentPage === walletTotalPages
                                }
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </>
              )}
            </CardContent>
          </Card>
        </div>
        {/* User Details Dialog */}
        <Dialog open={showUserDetails} onOpenChange={setShowUserDetails}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Detailed information about the user
              </DialogDescription>
            </DialogHeader>
            {selectedUser && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Name</Label>
                  <div className="col-span-3 font-medium">
                    {selectedUser.name}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Phone</Label>
                  <div className="col-span-3">{selectedUser.phone}</div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Role</Label>
                  <div className="col-span-3">
                    <span
                      className={`px-2 py-1 capitalize rounded-full text-xs ${
                        selectedUser.role === "agent"
                          ? "bg-blue-100 text-blue-800  dark:bg-blue-900 dark:text-blue-100"
                          : selectedUser.role === "admin"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Status</Label>
                  <div className="col-span-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedUser.isBlocked
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      }`}
                    >
                      {selectedUser.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Created</Label>
                  <div className="col-span-3">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setShowUserDetails(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Action</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to {confirmationData.action}{" "}
                {confirmationData.userName}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmUserAction}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
export default AdminDashboard;
