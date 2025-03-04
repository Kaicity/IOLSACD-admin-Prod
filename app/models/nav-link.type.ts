// Định nghĩa interface cho NavLink

export default interface NavLink {
  path: string;
  label: string;
  icon?: React.ElementType;
  group: "main" | "management" | "statistic" | "general-information";
  isActive: boolean;
  children?: NavLink[];
}
