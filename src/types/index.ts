export interface CPaginationOptions {
  itemCount: number;
  currentPage?: number;
  totalVisible?: number;
  itemsPerPage?: number;
  startFrom?: number;
  endTo?: number;
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
  sortable?: boolean;
  children?: CDataTableChild[];
  hidden?: boolean;
  align?: 'start' | 'center' | 'end';
}

export interface CDataTableData {
  [key: string]: CDataTableDataItem;
}

export interface CDataTableDataItem {
  value: string | number;
  children?: CDataTableChild[];
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
  customContent?: string;
}

export enum CAlertType {
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
  Info = 'info',
}
