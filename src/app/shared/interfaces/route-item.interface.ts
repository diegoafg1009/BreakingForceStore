export interface RouteItem {
  path: string;
  queryParams?: { [key: string]: string };
  label: string;
  icon?: string;
  children?: RouteItem[];
}
