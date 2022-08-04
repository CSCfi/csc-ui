import {
  mdiArrowDownThin,
  mdiArrowUpThin,
  mdiSwapVertical,
  mdiChevronDown,
} from '@mdi/js';
import {
  Component,
  Host,
  h,
  Element,
  Event,
  EventEmitter,
  Prop,
  State,
  Fragment,
  Watch,
} from '@stencil/core';
import {
  CDataTableData,
  CDataTableDataItem,
  CDataTableFooterOptions,
  CDataTableHeader,
  CPaginationOptions,
} from '../../types';

interface CDataTableDataItemPrivate extends Omit<CDataTableDataItem, 'value'> {
  _hiddenData?: {
    id?: string;
    key?: string;
    value?: CDataTableDataItem;
  }[];
}

type HeaderRefs = Map<string, HTMLElement>;

/**
 * @group Tables
 */
@Component({
  tag: 'c-data-table',
  styleUrl: 'c-data-table.scss',
  shadow: true,
})
export class CDataTable {
  @Element() element: HTMLCDataTableElement;

  /**
   * Data of the table
   */
  @Prop() data: CDataTableData[] = [];

  /**
   * Externally sorted and paginated data
   */
  @Prop() externalData = false;

  /**
   * Headers of the table
   */
  @Prop() headers: CDataTableHeader[] = [];

  /**
   * Items per page options
   */
  @Prop() footerOptions: CDataTableFooterOptions = {
    itemsPerPageOptions: [5, 25, 50, 100],
    hideDetails: false,
    simple: false,
    hideRange: false,
    size: 'default',
  };

  /**
   * Show a loader on top of the table
   */
  @Prop() loading = false;

  /**
   * Text shown when there is no data and the table is loading
   */
  @Prop() loadingText = 'Loading data';

  /**
   * Text shown when there are no data available
   */
  @Prop() noDataText = 'No data';

  /**
   * Pagination options
   */
  @Prop() pagination: CPaginationOptions;

  /**
   * Make rows selectable
   */
  @Prop() selectable = false;

  /**
   * Property used in selections
   */
  @Prop() selectionProperty: string = null;

  /**
   * Allow only a single row expanded at a time
   */
  @Prop() singleExpansion = false;

  /**
   * Sort data by
   */
  @Prop() sortBy = null;

  /**
   * Sorting direction
   */
  @Prop() sortDirection: 'asc' | 'desc' | null = null;

  /**
   * Triggered on pagination
   */
  @Event() paginate: EventEmitter<CPaginationOptions>;

  /**
   * Triggered on row expansion
   */
  @Event() expand: EventEmitter;

  /**
   * Triggered on sort
   */
  @Event() sort: EventEmitter;

  /**
   * Triggered on selection
   */
  @Event() selection: EventEmitter;

  @State() _activeRows: (number | string)[] = [];

  @State() _data: CDataTableDataItemPrivate[] = [];

  @State() _isPaginationSimple = false;

  @State() _selectedRows: (string | number)[] = [];

  @State() hasOverflow = false;

  @State() hiddenHeaders: string[] = [];

  private _debounce = null;

  private _extraHeaders: CDataTableHeader[] = [];

  private _rootIntersectionObserver: IntersectionObserver;

  private _resizeObserver: ResizeObserver;

  private _tableElement: HTMLTableElement;

  private _footerElement: HTMLTableRowElement;

  private _headerRefs: HeaderRefs;

  private _isValidated = false;

  private _isVisible = false;

  @Watch('hiddenHeaders')
  onHeaderChange() {
    this._getData();
  }

  @Watch('data')
  onDataChange() {
    this._getData();
  }

  componentWillLoad() {
    this.sortBy = this.sortBy ?? this.headers[0].key;
    this._getData();

    // Hide the initially hidden headers
    this.hiddenHeaders = [
      ...new Set([
        ...this.hiddenHeaders,
        ...this.headers
          .filter((header) => !!header.hidden)
          .map((header) => header.key),
      ]),
    ];
  }

  componentDidLoad() {
    this._rootIntersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this._handleResponsiveHeaders();

        this._isVisible = true;
      }
    });

    this._resizeObserver = new ResizeObserver(([entry]) => {
      this._handleResize(entry);
    });

    this._rootIntersectionObserver.observe(this.element);
    this._resizeObserver.observe(this._tableElement);
  }

  disconnectedCallback() {
    this._resizeObserver.disconnect();
    this._rootIntersectionObserver.disconnect();
  }

  private _handleResponsiveHeaders() {
    const { width: tableWidth } = this._tableElement.getBoundingClientRect();
    const { width: rootWidth, x } = this.element.getBoundingClientRect();

    if (rootWidth < tableWidth) {
      if (this._debounce !== null) {
        clearTimeout(this._debounce);
        this._debounce = null;
      }

      setTimeout(() => {
        for (const header of this._headerRefs.values()) {
          if (header) {
            const position = header.getBoundingClientRect();
            const isFullyVisible = position.right - x <= rootWidth;
            const isLastVisibleHeader =
              header.dataset.id === Array.from(this._headerRefs.keys()).at(0);

            if (!isFullyVisible && !isLastVisibleHeader) {
              this.hiddenHeaders = [
                ...new Set([...this.hiddenHeaders, header.dataset.id]),
              ];
            }
          }
        }

        this._debounce = setTimeout(() => {
          const footerWidth =
            this._footerElement?.getBoundingClientRect()?.width || 0;

          if (rootWidth < footerWidth) {
            this._isPaginationSimple = true;
          }
        }, 200);
      }, 0);
    }
  }

  private _addHeaderRef(key: string, el: HTMLElement) {
    if (!this._headerRefs) {
      this._headerRefs = new Map([[key, el]]);

      return;
    }

    this._headerRefs.set(key, el);
  }

  private _getData() {
    this._extraHeaders = this.headers.filter(
      (header) => !Object.keys(this.data?.[0] || {}).includes(header.key),
    );

    // create cells for headers not present in the data
    const extraCells = this._extraHeaders.reduce(
      (cells, header) => ({
        ...cells,
        [header.key]: {
          value: null,
        },
      }),
      {},
    );

    const items = this.data
      .map((row) => ({
        ...row,
        ...extraCells,
      }))
      .reduce<CDataTableDataItemPrivate[]>((data, cell) => {
        const item: CDataTableDataItemPrivate = {
          _hiddenData: [],
        };

        Object.keys(cell)
          // remove keys not present in headers
          .filter((key) => this._headerKeys.includes(key))
          .forEach((key) => {
            item[key] = cell[key];
          });

        this.hiddenHeaders.forEach((header) => {
          const cellData = this.headers.find((h) => h.key === header);

          item._hiddenData.push({
            id: cellData?.key,
            key: cellData?.value,
            value: cell[header],
          });
        });

        data.push(item);

        return data;
      }, []);

    this._data = this._sortData(items);

    this._validateProps(this._data[0]);
  }

  private get _headers() {
    return this.headers.filter(
      (header) => !this.hiddenHeaders.includes(header.key) && !header.hidden,
    );
  }

  private get _headerKeys() {
    return this._headers.map((header) => header.key);
  }

  private get _hasHiddenData() {
    return !!this.hiddenHeaders.length;
  }

  private _sortData(
    data: CDataTableDataItem[] | CDataTableDataItemPrivate[],
  ): CDataTableDataItemPrivate[] {
    if (!this.sortBy || this.externalData) return data;

    const sorted = data.sort((a, b) => {
      const valueA = a[this.sortBy].value;
      const valueB = b[this.sortBy].value;

      if (typeof valueA === 'string') {
        if (this.sortDirection === 'asc') {
          return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
        }

        return valueB.toLowerCase().localeCompare(valueA.toLowerCase());
      }

      if (typeof valueA === 'number') {
        if (this.sortDirection === 'asc') {
          return valueA - valueB;
        }

        return valueB - valueA;
      }
    });

    return !!this.pagination
      ? sorted.slice(this.pagination.startFrom, this.pagination.endTo + 1)
      : sorted;
  }

  private _handleResize(entry: ResizeObserverEntry) {
    const { height } = entry.contentRect;

    this.element.style.height = `${Math.ceil(height)}px`;

    if (this._isVisible) {
      this._handleResponsiveHeaders();
    }
  }

  private _onPaginationChange(event: CustomEvent) {
    if (this.externalData) {
      this.paginate.emit(event.detail);

      return;
    }

    this.pagination = {
      ...this.pagination,
      ...event.detail,
    };

    this._getData();
  }

  private _onSelection(value: string | number) {
    if (this._selectedRows.includes(value)) {
      this._selectedRows = this._selectedRows.filter(
        (selection) => selection !== value,
      );
    } else {
      this._selectedRows = [...this._selectedRows, value];
    }

    this.selection.emit(this._selectedRows);
  }

  private _onSort(key: string) {
    if (this.sortBy === key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
    }

    this.sortBy = key;

    this.sort.emit({ sortBy: this.sortBy, direction: this.sortDirection });

    this._getData();
  }

  private _onToggleAdditionalData(
    event: MouseEvent,
    value: string | number,
    row,
  ) {
    if (
      !this._hasHiddenData ||
      (event.target as HTMLElement).tagName === 'C-CHECKBOX'
    )
      return;

    const isActive = this.singleExpansion
      ? this._activeRows[0] === value
      : this._activeRows.includes(value);

    const { _hiddenData, ...data } = row;

    Object.keys(data).forEach((key) => {
      data[key] = data[key].value;
    });

    _hiddenData.forEach((hiddenRow) => {
      data[hiddenRow.id] = hiddenRow.value.value;
    });

    this.expand.emit({
      active: !isActive,
      row: data,
    });

    if (this.singleExpansion) {
      this._activeRows = isActive ? [] : [value];

      return;
    }

    if (isActive) {
      this._activeRows = this._activeRows.filter((i) => i !== value);

      return;
    }

    this._activeRows = [...this._activeRows, value];
  }

  private _renderAdditioanlDataRow(rowIndex: number, rowData = {}) {
    return (
      this._hasHiddenData && (
        <tr
          class={{
            'additional-data': true,
            active: this._activeRows.includes(rowIndex),
          }}
        >
          <td colSpan={100}>
            <div>
              <ul>
                {this._renderHiddenCells(rowIndex)}
                {this._renderHiddenHeaderChildren(rowIndex, rowData)}
              </ul>
            </div>
          </td>
        </tr>
      )
    );
  }

  private _renderCellData(
    key: string,
    options: CDataTableDataItem,
    colIndex: number,
    rowIndex: number,
  ) {
    const component = options.component || this._headers[colIndex]?.component;
    const Tag = component?.tag || null;
    const injectValue = !!component?.injectValue;
    const params = component?.params || {};

    if (injectValue) {
      params.value = options.value;
    }

    return !!Tag ? (
      <Tag
        {...params}
        onClick={(event: MouseEvent) =>
          params?.onClick?.({
            index: rowIndex,
            value: options.value,
            data: this.data[rowIndex],
            event,
            key,
          })
        }
      >
        {options.value}
      </Tag>
    ) : (
      options.value
    );
  }

  private _renderCellChildren(
    options: CDataTableDataItem | CDataTableHeader,
    index: number,
    key: string,
    data = {},
  ) {
    return options.children.map((child) => {
      const Tag = child.component?.tag;
      const params = child.component?.params || {};

      return !!Tag ? (
        <Tag
          {...params}
          onClick={(event: MouseEvent) =>
            params?.onClick?.({
              value: options.value,
              index,
              event,
              key,
              data,
            })
          }
        >
          {child.value}
        </Tag>
      ) : (
        child.value
      );
    });
  }

  private _renderExpansionIndicator() {
    return (
      this._hasHiddenData && (
        <td>
          <div>
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d={mdiChevronDown} />
            </svg>
          </div>
        </td>
      )
    );
  }

  private _renderHiddenCells(index) {
    return this._data[index]._hiddenData
      .filter((d) => !this._extraHeaders.find((h) => h.key === d.id))
      .map(({ id, key, value: options }) => {
        const index = this._headers.findIndex((h) => h.key === id);

        return (
          <li>
            {!!key && (
              <div class="title">
                <span>{key}:</span>
                {this._renderCellData(id, options, index, index)}
              </div>
            )}

            {!!options.children && (
              <div class="children">
                {this._renderCellChildren(options, index, id)}
              </div>
            )}
          </li>
        );
      });
  }

  private _renderHiddenHeaderChildren(index, rowData) {
    return this._data[index]._hiddenData.map(({ id, key }) => {
      const headerIndex = this.headers.findIndex((h) => h.key === id);

      return (
        !!this.headers[headerIndex]?.children && (
          <li>
            <div class="children">
              {this._renderCellChildren(
                this.headers[headerIndex],
                index,
                key,
                rowData,
              )}
            </div>
          </li>
        )
      );
    });
  }

  private _renderLoaderRow() {
    return (
      <tr>
        <td class="loader" colSpan={100}>
          {this.loading && (
            <div class="c-data-table__loader">
              <div class="loading-bar" />
            </div>
          )}
        </td>
      </tr>
    );
  }

  private _renderRows() {
    return (
      !!this._data.length &&
      Object.values(this._data).map((rowData, rowIndex) => {
        const selectionValue = !!this.selectionProperty
          ? rowData[this.selectionProperty]?.value || rowIndex
          : rowIndex;
        const isSelected = this._selectedRows.includes(selectionValue);

        return (
          <Fragment>
            <tr
              class={{
                active: this._activeRows.includes(rowIndex),
                parent: this._hasHiddenData,
                selected: isSelected,
              }}
              onClick={(event) =>
                this._onToggleAdditionalData(event, rowIndex, rowData)
              }
            >
              {this._renderSelectionCell(isSelected, selectionValue)}
              {this._renderExpansionIndicator()}
              {this._renderTableCells(rowIndex, rowData)}
            </tr>

            {this._renderAdditioanlDataRow(rowIndex, rowData)}
          </Fragment>
        );
      })
    );
  }

  private _renderSelectionCell(
    isSelected: boolean,
    selectionValue: string | number,
  ) {
    return (
      this.selectable && (
        <td>
          <div class="selection">
            <c-checkbox
              value={isSelected}
              hide-details
              onChangeValue={() => this._onSelection(selectionValue)}
            ></c-checkbox>
          </div>
        </td>
      )
    );
  }

  private _renderSortIndicator(key: string) {
    let iconPath = mdiSwapVertical;

    if (key === this.sortBy && this.sortDirection === 'asc') {
      iconPath = mdiArrowUpThin;
    }

    if (key === this.sortBy && this.sortDirection === 'desc') {
      iconPath = mdiArrowDownThin;
    }

    return (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d={iconPath} />
      </svg>
    );
  }

  private _renderStatusTextRow() {
    return (
      !this._data.length && (
        <tr>
          <td class="info" colSpan={100}>
            <div>{this.loading ? this.loadingText : this.noDataText}</div>
          </td>
        </tr>
      )
    );
  }

  private _renderTableBody() {
    return (
      <tbody>
        {this._renderLoaderRow()}
        {this._renderStatusTextRow()}
        {this._renderRows()}
      </tbody>
    );
  }

  private _renderTableCell(
    key: string,
    options: CDataTableDataItem,
    colIndex: number,
    rowIndex: number,
    rowData = {},
  ) {
    return (
      <td>
        <div
          data-align={this.headers.find((header) => header.key === key)?.align}
        >
          {this._renderCellData(key, options, colIndex, rowIndex)}

          {!!options.children && (
            <div class="children">
              {this._renderCellChildren(options, rowIndex, key, rowData)}
            </div>
          )}

          {!!this.headers.find((header) => header.key === key)?.children && (
            <div class="children">
              {this._renderCellChildren(
                this.headers.find((header) => header.key === key),
                rowIndex,
                key,
                rowData,
              )}
            </div>
          )}
        </div>
      </td>
    );
  }

  private _renderTableCells(rowIndex: number, rowData = {}) {
    return this._sortCellProperties(rowData).map(([key, options], index) =>
      this._renderTableCell(key, options, index, rowIndex, rowData),
    );
  }

  private _renderTableFooter() {
    return (
      !!this.pagination && (
        <tfoot>
          <tr ref={(el) => (this._footerElement = el as HTMLTableRowElement)}>
            <td colSpan={100}>
              <div>
                <c-pagination
                  {...this.footerOptions}
                  value={this.pagination}
                  simple={this._isPaginationSimple}
                  onChangeValue={(e) => this._onPaginationChange(e)}
                ></c-pagination>
              </div>
            </td>
          </tr>
        </tfoot>
      )
    );
  }

  private _renderTableHeader() {
    return (
      <thead>
        <tr>
          {this.selectable && <th class="selection"></th>}

          {this._hasHiddenData && <th class="indicator"></th>}

          {!!this._headers.length &&
            this._headers.map((header) => {
              const isSortable =
                !!header.sortable || typeof header.sortable === 'undefined';
              const params = {
                'data-id': header.key,
                ref: (el) => this._addHeaderRef(header.key, el),
                ...(!!header && {
                  style: {
                    ...(header.width && { width: header.width }),
                  },
                }),
                ...(isSortable && {
                  onClick: () => this._onSort(header.key),
                }),
              };

              return (
                <th {...params}>
                  <div class={{ sortable: isSortable }}>
                    {header.value}
                    {isSortable && this._renderSortIndicator(header.key)}
                  </div>
                </th>
              );
            })}
        </tr>
      </thead>
    );
  }

  /**
   * Order table row properties by the header keys
   */
  private _sortCellProperties(row: CDataTableDataItemPrivate) {
    return Object.entries(row)
      .filter(([key]) => !['_hiddenData'].includes(key))
      .sort(
        ([keyA], [keyB]) =>
          this._headerKeys.indexOf(keyA) - this._headerKeys.indexOf(keyB),
      );
  }

  private _validateProps(data) {
    if (
      !!data &&
      !this._isValidated &&
      this.selectionProperty !== null &&
      !data[this.selectionProperty]
    ) {
      console.warn(
        `[C-DATA-TABLE] Invalid selection property '${this.selectionProperty}'. Using row index as a fallback. This may lead to unexpected behavior.`,
      );

      this._isValidated = true;
    }
  }

  render() {
    const tableClasses = {
      'c-data-table': true,
      'c-data-table--hoverable': this.selectable || this._hasHiddenData,
    };

    return (
      <Host>
        <table
          class={tableClasses}
          ref={(el) => (this._tableElement = el as HTMLTableElement)}
        >
          {this._renderTableHeader()}
          {this._renderTableBody()}
          {this._renderTableFooter()}
        </table>
      </Host>
    );
  }
}
