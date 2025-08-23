// src/pages/user/UserDashboard.tsx
import { type Key } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import { DollarSign, Send, History, User, LogOut } from "lucide-react";
import { useGetBalanceQuery, useGetTransactionQuery } from "@/services/wallet";
import { useAppDispatch } from "@/hooks";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";

const UserDashboard = () => {
  const { data: balanceData, isLoading: balanceLoading } = useGetBalanceQuery();
  const { data: transactions = [], isLoading: transactionsLoading } =
    useGetTransactionQuery({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully");
  };
  console.log(transactions);
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Dashboard</h1>
        <div className="flex items-center space-x-2">
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
                `৳${balanceData?.data?.balance || "0.00"}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">Available funds</p>
          </CardContent>
        </Card>

        <Card className="tour-quick-actions">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex space-x-2">
            <Button size="sm" asChild>
              <Link to="/user/send">Send</Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link to="/user/request">Request</Link>
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
                transactions?.transactions?.length
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
              ) : transactions?.transactions?.length > 0 ? (
                <div className="space-y-4">
                  {transactions?.transactions
                    .slice(0, 5)
                    .map(
                      (transaction: {
                        _id: Key | null | undefined;
                        type: string;
                        createdAt: string | number | Date;
                        amount: number;
                      }) => (
                        <div
                          key={transaction._id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium capitalize">
                              {transaction.type.replace("-", " ")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString()}
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
                      )
                    )}
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
              <CardTitle>Quick Transfer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Phone</Label>
                  <Input id="recipient" placeholder="01712345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" type="number" placeholder="0.00" />
                </div>
                <Button className="w-full">Send Money</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
