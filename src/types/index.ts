export interface CPaginationOptions {
  itemCount: number;
  currentPage?: number;
  totalVisible?: number;
  itemsPerPage?: number;
  startFrom?: number;
  endTo?: number;
  locale?: string;
  textOverrides?: CPaginationTextOverrides;
}

export interface CPaginationTextOverrides {
  itemsPerPageText?: string;
  nextPage?: string;
  prevPage?: string;
  pageText?: ({ start, end, count }) => string;
  pageOfText?: ({ pageNumber, count }) => string;
}

export interface CSelectItem {
  name: string;
  value: string | number | boolean;
}

export interface CAutocompleteItem extends CSelectItem {
  ref?: HTMLElement;
}

export interface CRadioGroupItem {
  label: string;
  value: string | number;
}

export interface CDataTableFooterOptions {
  itemsPerPageOptions?: number[];
  hideDetails?: boolean;
  simple?: boolean;
  hideRange?: boolean;
  size?: 'default' | 'small';
}

export interface CDataTableHeader {
  key: string;
  value: null | string;
  component?: CDataTableComponent;
  width?: string;
  // pin items to exlude the from being hidden
  pinned?: boolean;
  sortable?: boolean;
  children?: CDataTableChild[];
  hidden?: boolean;
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
}

export interface CDataTableData {
  [key: string]: CDataTableDataItem;
}

export interface CDataTableDataItem {
  value: string | number;
  formattedValue?: string | number;
  plainTextValue?: string;
  children?: CDataTableChild[];
  align?: 'start' | 'center' | 'end';
  justify?: 'start' | 'center' | 'end';
  component?: CDataTableComponent;
}

export interface CDataTableChild {
  value: null | string;
  component?: CDataTableComponent;
}

export interface CDataTableComponent {
  tag: string;
  params?: CDataTableComponentParams;
  injectValue?: boolean;
}

export interface CDataTableComponentParams {
  [key: string]: any;
  onClick?: (params: CDataTableFunctionParams) => unknown;
}

export interface CDataTableFunctionParams {
  event: MouseEvent;
  index: number;
  value: string | number;
  key: string;
  data: CDataTableData;
}

export interface CNotificationItem {
  name: string;
  type: CNotificationItemType;
  delay?: number;
  requiresClosing?: boolean;
}

export type CNotificationItemType = 'warning' | 'error' | 'success' | 'info';

export enum CToastType {
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
  Info = 'info',
}

export enum CToastPosition {
  Absolute = 'absolute',
  Fixed = 'fixed',
}

export interface CToastMessage {
  message: string;
  title?: string;
  type?: CToastType;
  duration?: number;
  persistent?: boolean;
  position?: CToastPosition;
  id?: string;
  closeText?: string;
  indeterminate?: boolean;
  progress?: boolean;
  custom?: boolean;
}

export enum CAlertType {
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
  Info = 'info',
}

export interface CMenuCustomTrigger {
  value: string;
  component: {
    tag: string;
    params?: {
      [key: string]: unknown;
    };
  };
}

export interface CMenuOption {
  name: string;
  action: () => void;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'start' | 'end';
}

export type CSCColor =
  | 'primary'
  | 'primary-ghost'
  | 'primary-ghost-hover'
  | 'primary-hover'
  | 'primary-text-hover'
  | 'primary-hover'
  | 'primary-text-hover'
  | 'dark-grey'
  | 'mid-grey'
  | 'light-grey'
  | 'light-grey-blue'
  | 'lightest-grey'
  | 'link'
  | 'error'
  | 'warning'
  | 'success'
  | 'info';
