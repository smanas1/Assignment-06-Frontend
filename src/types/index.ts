export interface User {
  _id: string;
  name: string;
  phone: string;
  role: "user" | "agent" | "admin"; // ← User Type
  isBlocked: boolean;
  wallet: string;
  createdAt: string;
}
