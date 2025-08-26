/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/agent/AgentDashboard.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useCashInMutation,
  useCashOutMutation,
  useGetBalanceQuery,
  useGetTransactionQuery,
  useAddMoneyMutation,
  useWithdrawMoneyMutation,
  useGetCommissionHistoryQuery,
} from "@/services/wallet";
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
  DollarSign,
  Upload,
  Download,
  TrendingUp,
  User,
  LogOut,
  Check,
  Plus,
  Minus,
  History,
  Search,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  PieChart,
} from "lucide-react";

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
interface Transaction {
  _id: string;
  type: string;
  amount: number;
  commission?: number;
  sender?: {
    name: string;
    phone: string;
  };
  receiver?: {
    name: string;
    phone: string;
  };
  createdAt: string;
}

const AgentDashboard = () => {
  const { data: balanceData, isLoading: balanceLoading } = useGetBalanceQuery(
    {}
  );
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetTransactionQuery({});
  const { data: commissionData, isLoading: commissionLoading } =
    useGetCommissionHistoryQuery();
  const [cashIn, { isLoading: cashInLoading }] = useCashInMutation();
  const [cashOut, { isLoading: cashOutLoading }] = useCashOutMutation();
  const [addMoney, { isLoading: addLoading }] = useAddMoneyMutation();
  const [withdrawMoney, { isLoading: withdrawLoading }] =
    useWithdrawMoneyMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Extract data
  const balance = balanceData?.data?.balance ?? 0;
  const transactions = transactionsData?.transactions ?? [];
  const commissionHistory = commissionData ?? [];

  // Action states
  const [actionType, setActionType] = useState<
    "send" | "add" | "withdraw" | "cash-out" | null
  >(null);
  const [amount, setAmount] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    amount: 0,
    recipientPhone: "",
    actionType: "",
  });

  // Pagination and search states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all");

  // Filtered transactions
  const filteredTransactions = transactions.filter(
    (transaction: Transaction) => {
      const matchesSearch =
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.sender?.phone.includes(searchTerm) ?? false) ||
        (transaction.receiver?.phone.includes(searchTerm) ?? false);

      const matchesType =
        transactionTypeFilter === "all" ||
        transaction.type === transactionTypeFilter;

      return matchesSearch && matchesType;
    }
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Chart data preparation
  // Transaction volume by type
  const transactionVolumeByType = filteredTransactions.reduce(
    (acc: Record<string, number>, transaction: Transaction) => {
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
    filteredTransactions.forEach((transaction: Transaction) => {
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

  // Transaction distribution
  const sendTransactions = filteredTransactions.filter(
    (t: { type: string }) => t.type === "send-money" || t.type === "withdraw"
  ).length;

  const receiveTransactions = filteredTransactions.filter(
    (t: { type: string }) =>
      t.type === "receive" || t.type === "top-up" || t.type === "cash-in"
  ).length;

  const transactionDistribution = [
    { name: "Sent", value: sendTransactions },
    { name: "Received", value: receiveTransactions },
  ];

  // COLORS for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleActionClick = (
    type: "send" | "add" | "withdraw" | "cash-out"
  ) => {
    setActionType(type);
    setAmount("");
    setRecipientPhone("");
  };

  const handleActionSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setConfirmationData({
      amount: parseFloat(amount),
      recipientPhone,
      actionType: actionType || "",
    });
    setShowConfirmation(true);
    setActionType(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (confirmationData.actionType === "send") {
        if (!confirmationData.recipientPhone) {
          toast.error("Please enter recipient phone number");
          return;
        }
        await cashIn({
          userPhone: confirmationData.recipientPhone,
          amount: confirmationData.amount,
        }).unwrap();
        toast.success(
          `৳${confirmationData.amount} added to ${confirmationData.recipientPhone}`
        );
      } else if (confirmationData.actionType === "add") {
        await addMoney({ amount: confirmationData.amount }).unwrap();
        toast.success(`৳${confirmationData.amount} added to your wallet`);
      } else if (confirmationData.actionType === "withdraw") {
        await withdrawMoney({ amount: confirmationData.amount }).unwrap();
        toast.success(`৳${confirmationData.amount} withdrawn from your wallet`);
      } else if (confirmationData.actionType === "cash-out") {
        await cashOut({
          userPhone: confirmationData.recipientPhone,
          amount: confirmationData.amount,
        }).unwrap();
        toast.success(
          `৳${confirmationData.amount} withdrawn from ${confirmationData.recipientPhone}`
        );
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Transaction failed");
    } finally {
      setShowConfirmation(false);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  const handleActionClose = () => {
    setActionType(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Agent Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage agent transactions and your wallet
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" asChild>
              <Link to="/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Cards - COMMISSION EARNED REMOVED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {balanceLoading ? (
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  `৳${balance.toFixed(2)}`
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Available funds
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Transactions
              </CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {transactionsLoading ? (
                  <div className="h-8 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  transactions.length
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>

          {/* REPLACED COMMISSION EARNED WITH PERFORMANCE METRICS */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Performance Metrics
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {transactionsLoading || commissionLoading ? (
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : (
                  `${(
                    ((Array.isArray(commissionHistory)
                      ? commissionHistory.length
                      : 0) /
                      Math.max(transactions.length, 1)) *
                    100
                  ).toFixed(1)}%`
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Agent Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <Upload className="mr-2 h-5 w-5" />
                Cash-In
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                onClick={() => handleActionClick("send")}
              >
                Add Money to User
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600">
                <Download className="mr-2 h-5 w-5" />
                Cash-Out
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => handleActionClick("cash-out")}
              >
                Withdraw from User
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <Plus className="mr-2 h-5 w-5" />
                Add Money
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleActionClick("add")}
              >
                Add to Wallet
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Minus className="mr-2 h-5 w-5" />
                Withdraw Money
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleActionClick("withdraw")}
              >
                Withdraw
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions with Pagination and Search */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recent Transactions
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-8 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
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
                  <div className="rounded-md border">
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
                        {currentTransactions.length > 0 ? (
                          currentTransactions.map(
                            (transaction: Transaction) => (
                              <TableRow key={transaction._id}>
                                <TableCell>
                                  <span className="capitalize">
                                    {transaction.type.replace("-", " ")}
                                  </span>
                                </TableCell>
                                <TableCell
                                  className={`font-medium ${
                                    transaction.type.includes("send") ||
                                    transaction.type.includes("withdraw") ||
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

                  {/* Pagination Controls */}
                  {filteredTransactions.length > itemsPerPage && (
                    <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                      <div className="text-sm text-muted-foreground">
                        Showing {indexOfFirstItem + 1} to{" "}
                        {Math.min(indexOfLastItem, filteredTransactions.length)}{" "}
                        of {filteredTransactions.length} transactions
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                          <Button
                            key={i}
                            variant={
                              currentPage === i + 1 ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(i + 1)}
                          >
                            {i + 1}
                          </Button>
                        ))}
                        {totalPages > 5 && (
                          <>
                            {currentPage < totalPages - 2 && (
                              <span className="flex items-center px-2">
                                ...
                              </span>
                            )}
                            {currentPage < totalPages - 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(totalPages - 1)}
                              >
                                {totalPages - 1}
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePageChange(totalPages)}
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
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

          {/* Transaction Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2 h-5 w-5" />
                Transaction Distribution
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
                    <RechartsPieChart>
                      <Pie
                        data={transactionDistribution}
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
                        {transactionDistribution.map((_entry, index) => (
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

        {/* Action Dialogs */}
        <Dialog open={!!actionType} onOpenChange={handleActionClose}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {actionType === "send"
                  ? "Cash-In"
                  : actionType === "cash-out"
                  ? "Cash-Out"
                  : actionType === "add"
                  ? "Add Money"
                  : "Withdraw Money"}
              </DialogTitle>
              <DialogDescription>
                {actionType === "send"
                  ? "Add money to user's wallet"
                  : actionType === "cash-out"
                  ? "Withdraw money from user's wallet"
                  : actionType === "add"
                  ? "Add money to your wallet"
                  : "Withdraw money from your wallet"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {(actionType === "send" || actionType === "cash-out") && (
                <div className="space-y-2">
                  <Label htmlFor="recipient">User Phone</Label>
                  <Input
                    id="recipient"
                    placeholder="01712345678"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    ৳
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleActionSubmit}
                disabled={
                  cashInLoading ||
                  cashOutLoading ||
                  addLoading ||
                  withdrawLoading
                }
              >
                {cashInLoading ||
                cashOutLoading ||
                addLoading ||
                withdrawLoading
                  ? "Processing..."
                  : "Continue"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <AlertDialog
          open={showConfirmation}
          onOpenChange={handleConfirmationClose}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Transaction</AlertDialogTitle>
              <AlertDialogDescription>
                Please review the details before confirming
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Action</span>
                  <span className="font-medium capitalize">
                    {confirmationData.actionType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">
                    ৳{confirmationData.amount.toFixed(2)}
                  </span>
                </div>
                {confirmationData.recipientPhone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recipient</span>
                    <span className="font-medium">
                      {confirmationData.recipientPhone}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmAction}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AgentDashboard;
