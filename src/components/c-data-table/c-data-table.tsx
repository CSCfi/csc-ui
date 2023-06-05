import {
  mdiArrowDownThin,
  mdiArrowUpThin,
  mdiSwapVertical,
  mdiChevronDown,
  mdiChevronLeft,
  mdiChevronRight,
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
  Method,
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
   * Hide the footer
   */
  @Prop() hideFooter = false;

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
  @Prop({ mutable: true }) pagination: CPaginationOptions;

  /**
   * Make rows selectable
   */
  @Prop() selectable = false;

  /**
   * Select only a single row at a time
   */
  @Prop() singleSelection = false;

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
   * Use sticky header
   */
  @Prop() stickyHeader = false;

  /**
   * Use horizontal scrolling
   */
  @Prop() horizontalScrolling = false;

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

  @State() _isIntermediate = false;

  @State() _isPaginationSimple = false;

  @State() _selections: (string | number)[] = [];

  @State() hasOverflow = false;

  @State() hiddenHeaders: string[] = [];

  @State() initiallyHiddenHeaders: string[] = [];

  @State() forceRender = false;

  @State() breakpoints: number[] = [];

  @State() markedFooterWidth = 0;

  @State() parentWidth = 0;

  @State() firstCellHidden = false;

  @State() lastCellHidden = false;

  private _debounce = null;

  private _extraHeaders: CDataTableHeader[] = [];

  private _rootIntersectionObserver: IntersectionObserver;

  private _firstCellIntersectionObserver: IntersectionObserver;

  private _lastCellIntersectionObserver: IntersectionObserver;

  private _resizeObserver: ResizeObserver;

  private _tableElement: HTMLTableElement;

  private _footerElement: HTMLTableRowElement;

  private _headerRefs: HeaderRefs;

  private _isValidated = false;

  private _isVisible = false;

  @Watch('hiddenHeaders')
  onHiddenHeaderChange() {
    this._getData();
  }

  @Watch('data')
  onDataChange() {
    this._getData();
    this._handleInitialHeaders();
  }

  @Watch('headers')
  onHeaderChange() {
    this._handleInitialHeaders();
  }

  @Watch('singleSelection')
  onSingleSelectionChange() {
    this.clearSelections();
  }

  @Watch('loading')
  onLoadingChange(loading: boolean) {
    if (!loading) {
      this._setIntermediateStatus();
    }
  }

  /**
   * Clear selections externally
   */
  @Method()
  async clearSelections() {
    this._selections = [];
    this._emitChange();
  }

  componentWillLoad() {
    this.sortBy = this.sortBy ?? this.headers[0].key;
    this.sortDirection = this.sortDirection ?? 'asc';
    this._getData();

    this._handleInitialHeaders();
  }

  componentDidLoad() {
    if (!this.horizontalScrolling) {
      this._rootIntersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this._handleResponsiveHeaders();

          this._isVisible = true;
        }
      });

      this._resizeObserver = new ResizeObserver(() => {
        this._handleResize();
      });

      this._rootIntersectionObserver.observe(this.element);
    } else {
      const [firstCell] = this._headerKeys;
      const lastCell = this._headerKeys[this._headerKeys.length - 1];

      this._firstCellIntersectionObserver = new IntersectionObserver(
        ([entry]) => {
          this.firstCellHidden = !entry.isIntersecting;
        },
        { threshold: 1, rootMargin: '16px', root: this.element },
      );

      this._lastCellIntersectionObserver = new IntersectionObserver(
        ([entry]) => {
          this.lastCellHidden = !entry.isIntersecting;
        },
        { threshold: 1, rootMargin: '16px', root: this.element },
      );

      this._resizeObserver = new ResizeObserver(() => {
        this._handleScrollWidth();
      });

      this._firstCellIntersectionObserver.observe(
        this._tableElement.querySelector(`[data-id="${firstCell}"]`),
      );

      this._lastCellIntersectionObserver.observe(
        this._tableElement.querySelector(`[data-id="${lastCell}"]`),
      );
    }

    this._resizeObserver.observe(this.element);
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
    this._rootIntersectionObserver?.disconnect();
    this._firstCellIntersectionObserver?.disconnect();
    this._lastCellIntersectionObserver?.disconnect();
  }

  private _handleInitialHeaders() {
    this.initiallyHiddenHeaders = this.headers
      .filter((header) => !!header.hidden)
      .map((header) => header.key);

    // Hide the initially hidden headers
    this.hiddenHeaders = [
      ...new Set([...this.hiddenHeaders, ...this.initiallyHiddenHeaders]),
    ];
  }

  private _handleHeaderVisibility(
    header: HTMLElement,
    rootWidth: number,
    x: number,
  ) {
    const index = this._headers.findIndex((h) => h.key === header.dataset.id);
    const position = header.getBoundingClientRect();
    const isFullyVisible = position.right - x <= rootWidth;
    const isLastVisibleHeader =
      header.dataset.id === Array.from(this._headerRefs.keys()).at(0);
    const isPinned = this._headers[index]?.pinned;

    if (!isFullyVisible && isPinned && index >= 1) {
      const nextUnpinnedHeader = Array.from(this._headerRefs.values())
        .reverse()
        .find((hdr) => {
          if (!hdr) return false;

          return !this._headers.find((h) => h.key === hdr.dataset.id)?.pinned;
        });

      this.hiddenHeaders = [
        ...new Set([
          ...this.initiallyHiddenHeaders,
          ...this.hiddenHeaders,
          (nextUnpinnedHeader || header).dataset.id, // hide the pinned header as a last resort
        ]),
      ];

      return;
    }

    if (!isFullyVisible && !isLastVisibleHeader) {
      this.hiddenHeaders = [
        ...new Set([
          ...this.initiallyHiddenHeaders,
          ...this.hiddenHeaders,
          header.dataset.id,
        ]),
      ];
    }
  }

  private _handleResponsiveHeaders() {
    const { width: tableWidth } = this._tableElement.getBoundingClientRect();
    const { width: rootWidth, x } = this.element.getBoundingClientRect();
    const footerWidth =
      this._footerElement?.getBoundingClientRect()?.width || 0;

    if (this._debounce !== null) {
      clearTimeout(this._debounce);
      this._debounce = null;
    }

    if (rootWidth < tableWidth) {
      this.breakpoints = [...new Set([...this.breakpoints, tableWidth])];

      setTimeout(() => {
        for (const header of this._headerRefs.values()) {
          if (header) {
            this._handleHeaderVisibility(header, rootWidth, x);
          }
        }

        this._debounce = setTimeout(() => {
          if (rootWidth < footerWidth) {
            this.markedFooterWidth = footerWidth;
            this._isPaginationSimple = true;
          }
        }, 200);
      }, 0);
    } else if (
      this.breakpoints.length > 0 &&
      tableWidth >= this.breakpoints[this.breakpoints.length - 1]
    ) {
      this.breakpoints.pop();
      // Header that can be unhided from current hiddenHeaders
      const displayHeader = this.headers.find((header) =>
        this.hiddenHeaders.includes(header.key),
      );

      if (!!displayHeader) {
        const headerIndex = this.hiddenHeaders.indexOf(displayHeader.key);
        this.hiddenHeaders.splice(headerIndex, 1);
        this.hiddenHeaders = [
          ...new Set([...this.hiddenHeaders, ...this.initiallyHiddenHeaders]),
        ];
      }
    }

    this._debounce = setTimeout(() => {
      if (rootWidth >= this.markedFooterWidth && this.markedFooterWidth > 0) {
        this._isPaginationSimple = false;
      }
    }, 200);
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

        Object.keys(cell).forEach((key) => {
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

    this.pagination = { ...this.pagination, itemCount: this.data.length };

    this._validateProps(this._data[0]);

    this._handleScrollWidth();

    requestAnimationFrame(() => {
      this._handleResize();
    });
  }

  private _getSelectionValue(
    row: CDataTableDataItemPrivate,
    index: number,
  ): string | number {
    return !!this.selectionProperty
      ? row[this.selectionProperty]?.value || index
      : index;
  }

  private get _headers() {
    return this.headers
      .map((header) => ({
        ...header,
        pinned: !!header.pinned,
      }))
      .filter(
        (header) => !this.hiddenHeaders.includes(header.key) && !header.hidden,
      );
  }

  private get _headerKeys() {
    return this._headers.map((header) => header.key);
  }

  private get _hasHiddenData() {
    return !!this.hiddenHeaders.length;
  }

  private _emitChange() {
    this.selection.emit(this._selections);
  }

  private _setIntermediateStatus() {
    requestAnimationFrame(() => {
      this._isIntermediate = this._isPageIntermediate();
      this._refresh();
    });
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

    return !!this.pagination && !this.hideFooter
      ? sorted.slice(this.pagination.startFrom, this.pagination.endTo + 1)
      : sorted;
  }

  private _handleScrollWidth() {
    this.parentWidth = this.element.getBoundingClientRect().width;
  }

  private _handleResize() {
    if (this._isVisible) {
      this._handleResponsiveHeaders();
    }
  }

  private _getIndex(index: number) {
    let realIndex = index;

    if (
      !this.selectionProperty &&
      !!this.pagination &&
      typeof realIndex === 'number'
    ) {
      realIndex += this.pagination.startFrom;

      if (this.sortDirection === 'desc') {
        realIndex = this.pagination.itemCount - 1 - realIndex;
      }
    }

    return realIndex;
  }

  private _getSelectionsForPage() {
    return this._selections.filter((selection) =>
      this._data
        .map((row, index) =>
          this._getSelectionValue(row, this._getIndex(index)),
        )
        .includes(selection),
    );
  }

  private _hasSelectionsOnPage() {
    return this._getSelectionsForPage().length > 0;
  }

  private _isPageIntermediate() {
    const selectionsInPage = this._getSelectionsForPage();

    return (
      this._hasSelectionsOnPage() && selectionsInPage.length < this._data.length
    );
  }

  private _onHeadingSelection(event: KeyboardEvent | MouseEvent) {
    event?.stopPropagation();
    event?.preventDefault();

    if (
      event instanceof KeyboardEvent &&
      event.type === 'keyup' &&
      event.key !== ' '
    ) {
      return;
    }

    if (this._debounce !== null) {
      clearTimeout(this._debounce);
      this._debounce = null;
    }

    this._debounce = setTimeout(() => {
      if (this._data.length === this._getSelectionsForPage().length) {
        this._selections = [
          ...this._selections.filter(
            (selection) =>
              !this._data
                .map((row, index) =>
                  this._getSelectionValue(row, this._getIndex(index)),
                )
                .includes(selection),
          ),
        ];

        this._setIntermediateStatus();
        this._emitChange();

        this._tableElement;

        return;
      }

      this._selections = [
        ...new Set([
          ...this._selections,
          ...this._data.map((row, index) =>
            this._getSelectionValue(row, this._getIndex(index)),
          ),
        ]),
      ];

      this._setIntermediateStatus();
      this._emitChange();
    }, 200);
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

    this._setIntermediateStatus();

    this._getData();
  }

  private _onSelection(value: string | number) {
    if (this.singleSelection) {
      this._selections = [value];

      this._emitChange();
      this._refresh();

      return;
    }

    if (this._selections.includes(value)) {
      this._selections = this._selections.filter(
        (selection) => selection !== value,
      );
    } else {
      this._selections = [...this._selections, value];
    }

    this._emitChange();

    this._setIntermediateStatus();
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

    this._setIntermediateStatus();
    this._refresh();
  }

  private _onToggleAdditionalData(
    event: KeyboardEvent | MouseEvent,
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

  private _handleKeyUp(event: KeyboardEvent, value: string | number, row) {
    event.preventDefault();

    if (event.key === 'Enter') {
      this._onToggleAdditionalData(event, value, row);
    }
  }

  private _refresh() {
    this.forceRender = !this.forceRender;
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
        onClick={(event: MouseEvent) => {
          params?.onClick?.({
            index: rowIndex,
            value: options.value,
            data: this.data[rowIndex],
            event,
            key,
          });
        }}
      >
        {options.formattedValue || options.value}
      </Tag>
    ) : (
      options.formattedValue || options.value
    );
  }

  private _renderCellChildren(
    options: CDataTableDataItem | CDataTableHeader,
    index: number,
    key: string,
    data: CDataTableDataItemPrivate,
  ) {
    return options.children.map((child) => {
      const Tag = child.component?.tag;
      const params = child.component?.params || {};

      const { _hiddenData = [], ...rest } = data;

      const flatData: CDataTableData = {
        ...(rest as Partial<CDataTableData>),
        ..._hiddenData.reduce((obj, row) => {
          obj[row.id] = row.value;

          return obj;
        }, {} as CDataTableData),
      };

      return !!Tag ? (
        <Tag
          {...params}
          onClick={(event: MouseEvent) => {
            params?.onClick?.({
              value: options.value,
              index,
              event,
              key,
              data: flatData,
            });
          }}
        >
          {child.value}
        </Tag>
      ) : (
        child.value
      );
    });
  }

  private _renderExpansionIndicator(rowIndex: number, rowData = {}) {
    return (
      this._hasHiddenData && (
        <td>
          <div
            tabindex="0"
            onKeyUp={(event: KeyboardEvent) =>
              this._handleKeyUp(event, rowIndex, rowData)
            }
          >
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
                {this._renderCellChildren(options, index, id, {})}
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
        let selectionValue = this._getSelectionValue(rowData, rowIndex);

        if (!this.selectionProperty && typeof selectionValue === 'number') {
          selectionValue = this._getIndex(selectionValue);
        }

        const isSelected = !!this._selections.includes(selectionValue);

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
              {this._renderExpansionIndicator(rowIndex, rowData)}
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
      <svg width="24" height="24" viewBox="0 0 24 24" tabindex={0}>
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
    const header = this.headers.find((header) => header.key === key);
    const isHidden = this.hiddenHeaders.includes(key);

    // Render only if key is present in headers
    return (
      !!header &&
      !isHidden && (
        <td>
          <div data-align={header?.align} data-justify={header?.justify}>
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
      )
    );
  }

  private _renderTableCells(rowIndex: number, rowData = {}) {
    return this._sortCellProperties(rowData).map(([key, options], index) =>
      this._renderTableCell(key, options, index, rowIndex, rowData),
    );
  }

  private _renderTableFooter() {
    const footerStyles = this.horizontalScrolling
      ? {
          maxWidth: `${this.parentWidth}px`,
          position: 'sticky',
          left: '0',
        }
      : {};

    return (
      !!this.pagination && (
        <tfoot>
          <tr ref={(el) => (this._footerElement = el as HTMLTableRowElement)}>
            <td colSpan={100}>
              <div class="c-data-table__footer" style={footerStyles}>
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
    const indicatorRowStyles = this.horizontalScrolling
      ? {
          width: `${this.parentWidth - 8}px`,
          position: 'sticky',
          left: '4px',
        }
      : {};

    return (
      <thead class={{ sticky: this.stickyHeader }}>
        <tr>
          {this.selectable && (
            <th class="selection">
              {!this.singleSelection && (
                <div class="selection--heading">
                  <c-checkbox
                    value={this._hasSelectionsOnPage()}
                    intermediate={this._isIntermediate}
                    hide-details
                    onClick={(event: MouseEvent) =>
                      this._onHeadingSelection(event)
                    }
                    onKeyUp={(event: KeyboardEvent) =>
                      this._onHeadingSelection(event)
                    }
                  ></c-checkbox>
                </div>
              )}
            </th>
          )}

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
                    ...(header.width && { minWidth: header.width }),
                  },
                }),
                ...(isSortable && {
                  onClick: () => this._onSort(header.key),
                  onKeyUp: () => this._onSort(header.key),
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

        {this.horizontalScrolling && (
          <tr class="c-data-table__header-indicators">
            <th colSpan={100}>
              <div style={indicatorRowStyles}>
                {this.firstCellHidden && (
                  <c-icon-button
                    class="first"
                    size="small"
                    outlined
                    onClick={() => this._scrollLeft()}
                  >
                    <c-icon path={mdiChevronLeft}></c-icon>
                  </c-icon-button>
                )}

                <c-spacer />

                {this.lastCellHidden && (
                  <c-icon-button
                    class="last"
                    size="small"
                    outlined
                    onClick={() => this._scrollRight()}
                  >
                    <c-icon path={mdiChevronRight}></c-icon>
                  </c-icon-button>
                )}
              </div>
            </th>
          </tr>
        )}
      </thead>
    );
  }

  private _scrollLeft() {
    const leftBorder = this.element.getBoundingClientRect().left;

    const hiddenHeaderKeys = this._headerKeys.filter((key) => {
      const headerCellLeftBorder = this._tableElement
        .querySelector(`[data-id="${key}"]`)
        ?.getBoundingClientRect().left;

      return headerCellLeftBorder < leftBorder - 2;
    });

    if (hiddenHeaderKeys.length) {
      if (hiddenHeaderKeys.length === 1) {
        this._tableElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });

        return;
      }

      this._tableElement
        .querySelector(
          `[data-id="${hiddenHeaderKeys[hiddenHeaderKeys.length - 1]}"]`,
        )
        .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  private _scrollRight() {
    const rightBorder = this.element.getBoundingClientRect().right;

    const hiddenHeaderKeys = this._headerKeys.filter((key) => {
      const headerCellRightBorder = this._tableElement
        .querySelector(`[data-id="${key}"]`)
        ?.getBoundingClientRect().right;

      return headerCellRightBorder > rightBorder + 2;
    });

    if (hiddenHeaderKeys.length) {
      this._tableElement
        .querySelector(`[data-id="${hiddenHeaderKeys[0]}"]`)
        .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /**
   * Order table row properties by the header keys
   */
  private _sortCellProperties(row: CDataTableDataItemPrivate) {
    const sorted = Object.entries(row)
      .filter(([key]) => ![...this.hiddenHeaders, '_hiddenData'].includes(key))
      .sort(
        ([keyA], [keyB]) =>
          this._headerKeys.indexOf(keyA) - this._headerKeys.indexOf(keyB),
      );

    return sorted;
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
      'c-data-table--scrollable': this.horizontalScrolling,
    };

    return (
      <Host>
        <table
          class={tableClasses}
          ref={(el) => (this._tableElement = el as HTMLTableElement)}
        >
          <colgroup>
            {[
              ...(this.selectable ? ['_selection'] : []),
              ...(this.hiddenHeaders.length ? ['_hidden'] : []),
              ...this._headerKeys,
            ].map((key) => (
              <col class={this.sortBy === key && 'sorted-column'}></col>
            ))}
          </colgroup>
          {this._renderTableHeader()}
          {this._renderTableBody()}
          {!this.hideFooter && this._renderTableFooter()}
        </table>
      </Host>
    );
  }
}
