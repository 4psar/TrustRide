import * as Icons from "lucide-react-native";

export const ICON_MAP = {
  home: Icons.Home,
  users: Icons.Users,
  list: Icons.List,
  settings: Icons.Settings,
  person: Icons.User,
  barChart: Icons.BarChart,
  wallet: Icons.Wallet,
  history: Icons.History,
} as const;

export type IconName = keyof typeof ICON_MAP;
