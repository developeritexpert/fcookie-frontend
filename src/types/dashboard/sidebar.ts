export interface SidebarItem {
  id: string;
  name: string;
  svg?: React.ReactNode; // for inline JSX SVG
  icon?: string; // fallback image path
  link: string;
  pathCombinations?: string[];
}
