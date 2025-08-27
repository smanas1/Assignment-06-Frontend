/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/user/UserDashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Search,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Send,
  TrendingUp,
  User,
  LogOut,
  Check,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react";
import {
  useAddMoneyMutation,
  useGetBalanceQuery,
  useGetTransactionQuery,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
} from "@/services/wallet";
import { useAppDispatch } from "@/hooks";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";

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

const UserDashboard = () => {
  const { data: balanceData, isLoading: balanceLoading } = useGetBalanceQuery(
    {}
  );
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetTransactionQuery({});

  const [sendMoney, { isLoading: sendLoading }] = useSendMoneyMutation();
  const [addMoney, { isLoading: addLoading }] = useAddMoneyMutation();
  const [withdrawMoney, { isLoading: withdrawLoading }] =
    useWithdrawMoneyMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Action states
  const [actionType, setActionType] = useState<
    "send" | "add" | "withdraw" | null
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
  const [dateRangeFilter, setDateRangeFilter] = useState("all");

  // Extract data
  const balance = balanceData?.data?.balance ?? 0;
  const transactions = transactionsData?.transactions ?? [];
  console.log(transactions);
  // Filter transactions by type and date range
  const filteredTransactions = transactions.filter(
    (transaction: Transaction) => {
      // Type filter
      const matchesType =
        transactionTypeFilter === "all" ||
        transaction.type === transactionTypeFilter;

      // Date range filter
      let matchesDateRange = true;
      if (dateRangeFilter !== "all") {
        const transactionDate = new Date(transaction.createdAt);
        const now = new Date();
        const startDate = new Date();

        switch (dateRangeFilter) {
          case "today":
            startDate.setHours(0, 0, 0, 0);
            break;
          case "week":
            startDate.setDate(now.getDate() - 7);
            break;
          case "month":
            startDate.setMonth(now.getMonth() - 1);
            break;
          default:
            matchesDateRange = true;
        }

        matchesDateRange = transactionDate >= startDate;
      }

      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.sender?.phone.includes(searchTerm) ?? false) ||
        (transaction.receiver?.phone.includes(searchTerm) ?? false);

      return matchesType && matchesDateRange && matchesSearch;
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

  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [searchTerm, transactionTypeFilter, dateRangeFilter]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleActionClick = (type: "send" | "add" | "withdraw") => {
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
        await sendMoney({
          receiverPhone: confirmationData.recipientPhone,
          amount: confirmationData.amount,
        }).unwrap();
        toast.success(
          `৳${confirmationData.amount} sent to ${confirmationData.recipientPhone}`
        );
      } else if (confirmationData.actionType === "add") {
        await addMoney({ amount: confirmationData.amount }).unwrap();
        toast.success(`৳${confirmationData.amount} added to your wallet`);
      } else if (confirmationData.actionType === "withdraw") {
        await withdrawMoney({ amount: confirmationData.amount }).unwrap();
        toast.success(`৳${confirmationData.amount} withdrawn from your wallet`);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Something went wrong");
    } finally {
      setShowConfirmation(false);
    }
  };

  const getActionTitle = () => {
    switch (actionType) {
      case "send":
        return "Send Money";
      case "add":
        return "Add Money";
      case "withdraw":
        return "Withdraw Money";
      default:
        return "";
    }
  };

  const getActionDescription = () => {
    switch (actionType) {
      case "send":
        return "Enter recipient phone number and amount";
      case "add":
        return "Enter amount to add to your wallet";
      case "withdraw":
        return "Enter amount to withdraw from your wallet";
      default:
        return "";
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
              User Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your wallet and transactions
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

        {/* Stats Cards */}
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
                Quick Actions
              </CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => handleActionClick("send")}>
                  Send Money
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleActionClick("add")}
                >
                  Add Money
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleActionClick("withdraw")}
                >
                  Withdraw
                </Button>
              </div>
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
                  transactions.length
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions with Simplified Filters */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Recent Transactions
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search transactions..."
                      className="pl-8 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Filters Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                    {/* Type Filter */}
                    <Select
                      value={transactionTypeFilter}
                      onValueChange={setTransactionTypeFilter}
                    >
                      <SelectTrigger className="w-full sm:w-40">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="top-up">Add Money</SelectItem>
                        <SelectItem value="withdraw">Withdraw</SelectItem>
                        <SelectItem value="send-money">Send Money</SelectItem>
                        <SelectItem value="receive">Receive Money</SelectItem>
                        <SelectItem value="cash-in">Cash-In</SelectItem>
                        <SelectItem value="cash-out">Cash-Out</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Date Range Filter */}
                    <Select
                      value={dateRangeFilter}
                      onValueChange={setDateRangeFilter}
                    >
                      <SelectTrigger className="w-full sm:w-32">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <SelectValue placeholder="All Time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="week">Last 7 Days</SelectItem>
                        <SelectItem value="month">Last 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                        {[...Array(totalPages)].map((_, i) => (
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

        {/* Action Dialogs */}
        <Dialog open={!!actionType} onOpenChange={handleActionClose}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{getActionTitle()}</DialogTitle>
              <DialogDescription>{getActionDescription()}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {actionType === "send" && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipient" className="text-right">
                    Recipient
                  </Label>
                  <Input
                    id="recipient"
                    placeholder="01712345678"
                    className="col-span-3"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="action-amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="action-amount"
                  type="number"
                  placeholder="0.00"
                  className="col-span-3"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleActionSubmit}
                disabled={sendLoading || addLoading || withdrawLoading}
              >
                {sendLoading || addLoading || withdrawLoading
                  ? "Processing..."
                  : "Continue"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserDashboard;
