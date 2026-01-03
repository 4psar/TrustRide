import { IconName } from "./iconMap";

export type TrustRideUserRole = "Guest" | "User" | "Driver" | "Admin";

export interface NavigationMenuItem {
  path: string;
  label: string;
  icon: IconName;
}

export const ROLE_BASED_NAVIGATION: Record<
  TrustRideUserRole,
  { navItems: NavigationMenuItem[] }
> = {
  Admin: {
    navItems: [
      { path: "/dashboard", label: "Dashboard", icon: "home" },
      { path: "/users", label: "Users", icon: "users" },
      { path: "/drivers", label: "Drivers", icon: "list" },
      { path: "/analytics", label: "Analytics", icon: "barChart" },
      { path: "/settings", label: "Settings", icon: "settings" },
    ],
  },

  User: {
    navItems: [
      { path: "/user-dashboard", label: "Dashboard", icon: "home" },
      { path: "/book-ride", label: "Book Ride", icon: "list" },
      { path: "/ride-history", label: "Ride History", icon: "history" },
      { path: "/user-settings", label: "Settings", icon: "settings" },
    ],
  },

  Driver: {
    navItems: [
      { path: "/driver-dashboard", label: "Dashboard", icon: "home" },
      { path: "/available-rides", label: "Rides", icon: "list" },
      { path: "/earnings", label: "Earnings", icon: "wallet" },
      { path: "/account", label: "Profile", icon: "person" },
    ],
  },

  Guest: {
    navItems: [],
  },
};
