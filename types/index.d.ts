export interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface SearchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

// -----------  FOR REACT SELECT ---------------------------------
export type InputAction =
  | "set-value"
  | "input-change"
  | "input-blur"
  | "menu-close";

export interface InputActionMeta {
  action: InputAction;
  /** The previous value of the search input. */
  prevInputValue: string;
}
// -----------  FOR REACT SELECT --------------------------------- ///
