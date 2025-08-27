// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Menu,
  X,
  Home,
  Info,
  Star,
  Phone,
  HelpCircle,
  Users,
  Store,
  DollarSign,
} from "lucide-react";
import { Button } from "../ui/button";
import { logout } from "@/redux/slices/authSlice";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useState } from "react";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());

    setTimeout(() => {
      navigate("/");
      toast.success("Logged out successfully");
    }, 500);
  };

  // Navigation items for logged-in users
  const userNavItems = user
    ? [
        { name: "Dashboard", href: `/${user.role}`, icon: LayoutDashboard },
        { name: "Profile", href: `/profile`, icon: User },
        { name: "Settings", href: `/${user.role}/settings`, icon: Settings },
      ]
    : [];

  // Public navigation items
  const publicNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Features", href: "/features", icon: Star },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
  ];

  // Admin navigation items
  const adminNavItems = [
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Agents", href: "/admin/agents", icon: Store },
    { name: "Wallets", href: "/admin/wallets", icon: DollarSign },
    {
      name: "Transactions",
      href: "/admin/transactions",
      icon: LayoutDashboard,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              BanglaPay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {user ? (
              <>
                {user.role === "admin" ? (
                  <>
                    {adminNavItems.map((item) => (
                      <Button
                        key={item.name}
                        variant="ghost"
                        asChild
                        className="text-sm font-medium transition-colors hover:text-primary"
                      >
                        <Link to={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Link>
                      </Button>
                    ))}
                  </>
                ) : (
                  <>
                    {userNavItems.map((item) => (
                      <Button
                        key={item.name}
                        variant="ghost"
                        asChild
                        className="text-sm font-medium transition-colors hover:text-primary"
                      >
                        <Link to={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Link>
                      </Button>
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
                {publicNavItems.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    asChild
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    <Link to={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </Button>
                ))}
              </>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            <ModeToggle />

            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full"
                    >
                      <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem>
                      <Link
                        to={`/${user.role}`}
                        className="flex items-center w-full"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to={`/${user.role}/profile`}
                        className="flex items-center w-full"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to={`/${user.role}/settings`}
                        className="flex items-center w-full"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {user ? (
                <>
                  {user.role === "admin" ? (
                    <>
                      {adminNavItems.map((item) => (
                        <Button
                          key={item.name}
                          variant="ghost"
                          className="justify-start"
                          asChild
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link to={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Link>
                        </Button>
                      ))}
                    </>
                  ) : (
                    <>
                      {userNavItems.map((item) => (
                        <Button
                          key={item.name}
                          variant="ghost"
                          className="justify-start"
                          asChild
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Link to={item.href}>
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Link>
                        </Button>
                      ))}
                    </>
                  )}
                  <Button
                    variant="ghost"
                    className="justify-start text-red-500 hover:text-red-600"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  {publicNavItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="justify-start"
                      asChild
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link to={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    </Button>
                  ))}
                  <div className="flex space-x-2 pt-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="flex-1" asChild>
                      <Link to="/register">Register</Link>
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
