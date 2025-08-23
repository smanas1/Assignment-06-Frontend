/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/user/UserDashboard.tsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

import { DollarSign, Send, History, User, LogOut, Check } from "lucide-react";

import {
  useAddMoneyMutation,
  useGetBalanceQuery,
  useGetTransactionQuery,
  useSendMoneyMutation,
  useWithdrawMoneyMutation,
} from "@/services/wallet";
import { useAppDispatch } from "@/hooks";
import { useTour } from "@/components/layout/TourProvider";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";

// Define TypeScript interfaces
interface Transaction {
  _id: string;
  type: string;
  amount: number;
  createdAt: string;
  sender?: string;
  receiver?: string;
}

const UserDashboard = () => {
  const { data: balanceData, isLoading: balanceLoading } =
    useGetBalanceQuery() as {
      data?: { data: { balance: number } };
      isLoading: boolean;
    };
  const { data: transactionsData, isLoading: transactionsLoading } =
    useGetTransactionQuery({}) as {
      data?: { transactions: Transaction[] };
      isLoading: boolean;
    };

  const [sendMoney, { isLoading: sendLoading }] = useSendMoneyMutation();
  const [addMoney, { isLoading: addLoading }] = useAddMoneyMutation();
  const [withdrawMoney, { isLoading: withdrawLoading }] =
    useWithdrawMoneyMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { startTour } = useTour();
  const [showTour, setShowTour] = useState(false);

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

  // Extract data correctly with null checks
  const balance = balanceData?.data?.balance ?? 0;
  const transactions = transactionsData?.transactions ?? [];

  useEffect(() => {
    const tourCompleted = localStorage.getItem("tour-completed");
    if (!tourCompleted) {
      setShowTour(true);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully");
  };

  const startGuidedTour = () => {
    startTour();
    setShowTour(false);
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
    setActionType(null); // Close the action dialog
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

  // Close confirmation dialog handler
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
  };

  // Close action dialog handler
  const handleActionClose = () => {
    setActionType(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your wallet and transactions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {showTour && (
            <Button
              variant="outline"
              onClick={startGuidedTour}
              className="mr-2"
            >
              Start Tour
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/user/profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="tour-balance-card">
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
            <p className="text-xs text-muted-foreground">Available funds</p>
          </CardContent>
        </Card>

        <Card className="tour-quick-actions">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actions</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent Activity
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
            <p className="text-xs text-muted-foreground">
              Transactions this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="tour-transactions-table">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
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
              ) : transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction: Transaction) => (
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
                      <div
                        className={`font-medium ${
                          transaction.type.includes("send") ||
                          transaction.type.includes("withdraw")
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {transaction.type.includes("send") ||
                        transaction.type.includes("withdraw")
                          ? "-"
                          : "+"}
                        ৳{transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No transactions yet
                </p>
              )}
              <Button variant="ghost" className="w-full mt-4" asChild>
                <Link to="/user/transactions">View All Transactions</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Sent</span>
                  <span className="font-medium">৳2,450.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Received</span>
                  <span className="font-medium">৳3,120.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">This Month</span>
                  <span className="font-medium">৳850.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
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
  );
};

export default UserDashboard;
