import {
  FileText,
  LayoutDashboard,
  type LucideIcon,
  PackageIcon,
  ShoppingCart,
  UserRound,
  UsersRound,
  BadgePercent,
  FileSpreadsheet,
} from "lucide-react";

const paths: Array<{ path: string; title: string; icon: LucideIcon }> = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    path: "/inventory",
    title: "Inventory",
    icon: PackageIcon,
  },
  {
    path: "/purchase",
    title: "Purchase",
    icon: ShoppingCart,
  },
  { path: "/bill", title: "Bill", icon: FileText },
  {
    path: "/invoice",
    title: "Invoice",
    icon: FileSpreadsheet,
  },
  {
    path: "/sales",
    title: "Sales",
    icon: BadgePercent,
  },
  {
    path: "/customers",
    title: "Customers",
    icon: UsersRound,
  },
  {
    path: "/vendors",
    title: "Vendors",
    icon: UserRound,
  },
];

export default paths;
