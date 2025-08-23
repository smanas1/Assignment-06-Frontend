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
} from "lucide-react";

// Define proper TypeScript interfaces
interface Transaction {
  _id: string;
  type: string;
  amount: number;
  commission?: number;
  createdAt: string;
  sender?: string;
  receiver?: string;
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

const AgentDashboard = () => {
  // Properly typed RTK Query responses
  const {
    data: balanceData,
    isLoading: balanceLoading,
    isError: balanceError,
  } = useGetBalanceQuery();
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    isError: transactionsError,
  } = useGetTransactionQuery({});
  const {
    data: commissionData,
    isLoading: commissionLoading,
    isError: commissionError,
  } = useGetCommissionHistoryQuery();
  const [cashIn, { isLoading: cashInLoading }] = useCashInMutation();
  const [cashOut, { isLoading: cashOutLoading }] = useCashOutMutation();
  const [addMoney, { isLoading: addLoading }] = useAddMoneyMutation();
  const [withdrawMoney, { isLoading: withdrawLoading }] =
    useWithdrawMoneyMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Extract data safely with fallback values
  const balance = balanceData?.data?.balance ?? 0;
  const transactions = transactionsData?.transactions ?? [];
  const commissionHistory = commissionData;

  console.log(commissionHistory);

  // User action states
  const [showAddMoneyDialog, setShowAddMoneyDialog] = useState(false);
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [userAmount, setUserAmount] = useState("");

  // Agent action states
  const [showCashInDialog, setShowCashInDialog] = useState(false);
  const [showCashOutDialog, setShowCashOutDialog] = useState(false);
  const [agentUserPhone, setAgentUserPhone] = useState("");
  const [agentAmount, setAgentAmount] = useState("");

  // Commission history dialog
  const [showCommissionHistory, setShowCommissionHistory] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    userPhone: "",
    amount: 0,
    actionType: "",
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully");
  };

  // Handle user actions
  const handleAddMoneySubmit = () => {
    const amount = parseFloat(userAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setConfirmationData({
      userPhone: "",
      amount: amount,
      actionType: "add",
    });
    setShowConfirmation(true);
    setShowAddMoneyDialog(false);
  };

  const handleWithdrawSubmit = () => {
    const amount = parseFloat(userAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setConfirmationData({
      userPhone: "",
      amount: amount,
      actionType: "withdraw",
    });
    setShowConfirmation(true);
    setShowWithdrawDialog(false);
  };

  // Handle agent actions
  const handleCashInSubmit = () => {
    const amount = parseFloat(agentAmount);
    if (!agentUserPhone || isNaN(amount) || amount <= 0) {
      toast.error("Please enter valid phone number and amount");
      return;
    }

    setConfirmationData({
      userPhone: agentUserPhone,
      amount: amount,
      actionType: "cash-in",
    });
    setShowConfirmation(true);
    setShowCashInDialog(false);
  };

  const handleCashOutSubmit = () => {
    const amount = parseFloat(agentAmount);
    if (!agentUserPhone || isNaN(amount) || amount <= 0) {
      toast.error("Please enter valid phone number and amount");
      return;
    }

    setConfirmationData({
      userPhone: agentUserPhone,
      amount: amount,
      actionType: "cash-out",
    });
    setShowConfirmation(true);
    setShowCashOutDialog(false);
  };

  const handleConfirmAction = async () => {
    try {
      if (confirmationData.actionType === "add") {
        await addMoney({ amount: confirmationData.amount }).unwrap();
        toast.success(`৳${confirmationData.amount} added to your wallet`);
      } else if (confirmationData.actionType === "withdraw") {
        await withdrawMoney({ amount: confirmationData.amount }).unwrap();
        toast.success(`৳${confirmationData.amount} withdrawn from your wallet`);
      } else if (confirmationData.actionType === "cash-in") {
        await cashIn({
          userPhone: confirmationData.userPhone,
          amount: confirmationData.amount,
        }).unwrap();
        toast.success(
          `৳${confirmationData.amount} added to ${confirmationData.userPhone}`
        );
      } else if (confirmationData.actionType === "cash-out") {
        await cashOut({
          userPhone: confirmationData.userPhone,
          amount: confirmationData.amount,
        }).unwrap();
        toast.success(
          `৳${confirmationData.amount} withdrawn from ${confirmationData.userPhone}`
        );
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Transaction failed");
    } finally {
      setShowConfirmation(false);
      // Reset forms
      setUserAmount("");
      setAgentUserPhone("");
      setAgentAmount("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
              <Link to="/agent/profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Balance and Commission Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Balance Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Your Balance
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {balanceLoading ? (
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : balanceError ? (
                  <span className="text-red-500">Error loading</span>
                ) : (
                  `৳${balance.toFixed(2)}`
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Current wallet balance
              </p>
            </CardContent>
          </Card>

          {/* Commission Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Commission Earned
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {commissionLoading ? (
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                ) : commissionError ? (
                  <span className="text-red-500">Error loading</span>
                ) : (
                  `৳${commissionHistory
                    .reduce((sum, transaction) => sum + transaction.amount, 0)
                    .toFixed(2)}`
                )}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">This month</p>
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs"
                  onClick={() => setShowCommissionHistory(true)}
                >
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Cash-In Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <Upload className="mr-2 h-5 w-5" />
                Cash-In
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Add money to a user's wallet
                </p>
                <Button
                  className="w-full"
                  onClick={() => setShowCashInDialog(true)}
                >
                  Add Money to User
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cash-Out Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600">
                <Download className="mr-2 h-5 w-5" />
                Cash-Out
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Withdraw money from a user's wallet
                </p>
                <Button
                  className="w-full"
                  variant="secondary"
                  onClick={() => setShowCashOutDialog(true)}
                >
                  Withdraw from User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Wallet Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            User Wallet Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Money
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Add money to your own wallet
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => setShowAddMoneyDialog(true)}
                  >
                    Add to Wallet
                  </Button>
                </div>
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
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Withdraw money from your own wallet
                  </p>
                  <Button
                    className="w-full"
                    variant="secondary"
                    onClick={() => setShowWithdrawDialog(true)}
                  >
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Recent Transactions
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
              ) : transactionsError ? (
                <p className="text-center text-red-500 py-8">
                  Error loading transactions
                </p>
              ) : transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction._id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium capitalize">
                          {transaction.type.replace("-", " ")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
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
                        </div>
                        {transaction.commission && (
                          <div className="text-xs text-muted-foreground">
                            Commission: ৳{transaction.commission.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No transactions yet
                </p>
              )}
              <Button variant="ghost" className="w-full mt-6" asChild>
                <Link to="/agent/transactions">View All Transactions</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Add Money Dialog */}
        <Dialog open={showAddMoneyDialog} onOpenChange={setShowAddMoneyDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Money to Your Wallet</DialogTitle>
              <DialogDescription>
                Enter amount to add to your wallet
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="addAmount">Amount</Label>
                <div className="relative">
                  <Input
                    id="addAmount"
                    type="number"
                    placeholder="0.00"
                    value={userAmount}
                    onChange={(e) => setUserAmount(e.target.value)}
                    className="pl-8"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    ৳
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddMoneySubmit} disabled={addLoading}>
                {addLoading ? "Processing..." : "Add Money"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Withdraw Dialog */}
        <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw from Your Wallet</DialogTitle>
              <DialogDescription>
                Enter amount to withdraw from your wallet
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="withdrawAmount">Amount</Label>
                <div className="relative">
                  <Input
                    id="withdrawAmount"
                    type="number"
                    placeholder="0.00"
                    value={userAmount}
                    onChange={(e) => setUserAmount(e.target.value)}
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
                onClick={handleWithdrawSubmit}
                disabled={withdrawLoading}
                variant="secondary"
              >
                {withdrawLoading ? "Processing..." : "Withdraw"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cash-In Dialog */}
        <Dialog open={showCashInDialog} onOpenChange={setShowCashInDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cash-In</DialogTitle>
              <DialogDescription>Add money to user's wallet</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cashInUserPhone">User Phone Number</Label>
                <Input
                  id="cashInUserPhone"
                  placeholder="01712345678"
                  value={agentUserPhone}
                  onChange={(e) => setAgentUserPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cashInAmount">Amount</Label>
                <div className="relative">
                  <Input
                    id="cashInAmount"
                    type="number"
                    placeholder="0.00"
                    value={agentAmount}
                    onChange={(e) => setAgentAmount(e.target.value)}
                    className="pl-8"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    ৳
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCashInSubmit} disabled={cashInLoading}>
                {cashInLoading ? "Processing..." : "Add Money"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cash-Out Dialog */}
        <Dialog open={showCashOutDialog} onOpenChange={setShowCashOutDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cash-Out</DialogTitle>
              <DialogDescription>
                Withdraw money from user's wallet
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="cashOutUserPhone">User Phone Number</Label>
                <Input
                  id="cashOutUserPhone"
                  placeholder="01712345678"
                  value={agentUserPhone}
                  onChange={(e) => setAgentUserPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cashOutAmount">Amount</Label>
                <div className="relative">
                  <Input
                    id="cashOutAmount"
                    type="number"
                    placeholder="0.00"
                    value={agentAmount}
                    onChange={(e) => setAgentAmount(e.target.value)}
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
                onClick={handleCashOutSubmit}
                disabled={cashOutLoading}
                variant="secondary"
              >
                {cashOutLoading ? "Processing..." : "Withdraw"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Commission History Dialog */}
        <Dialog
          open={showCommissionHistory}
          onOpenChange={setShowCommissionHistory}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Commission History</DialogTitle>
              <DialogDescription>
                All commissions earned from transactions
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-96 overflow-y-auto py-2">
              {commissionLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : commissionError ? (
                <p className="text-center text-red-500 py-8">
                  Error loading commission history
                </p>
              ) : commissionHistory.length > 0 ? (
                <div className="space-y-3">
                  {commissionHistory.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.sender
                            ? `${transaction.sender.name} (${transaction.sender.phone})`
                            : "Unknown user"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(transaction.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="font-medium text-green-600">
                        +৳{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No commission history yet
                </p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowCommissionHistory(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Transaction</AlertDialogTitle>
              <AlertDialogDescription>
                Please review the details before confirming
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="space-y-3 bg-muted rounded-lg p-4">
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
                {confirmationData.userPhone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">User Phone</span>
                    <span className="font-medium">
                      {confirmationData.userPhone}
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
