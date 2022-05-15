export interface SimpleSidenav {
  id?: string|number;
  name?: string;
  icon?: string;
  menu?: Array<SimpleSidenav>;
}
