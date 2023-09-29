import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { mdiDelete, mdiFlag, mdiHeartPlus } from '@mdi/js';
import mockUsers from './mock-users';
import {
  CPaginationOptions,
  CDataTableFooterOptions,
  CDataTableHeader,
  CDataTableData,
  CToastType,
} from '../../../../../../src/types';

@Component({
  selector: 'app-c-data-table',
  templateUrl: './c-data-table.component.html',
  styleUrls: ['./c-data-table.component.scss'],
})
export class CDataTableComponent implements OnInit {
  // @example-start|basic
  basicData: CDataTableData[] = [
    {
      country: {
        value: 'Denmark',
        formattedValue: ' ',
        children: [
          {
            value: 'Denmark',
            component: {
              tag: 'p',
              params: {
                style: {
                  margin: 0,
                },
              },
            },
          },
          {
            value: '',
            component: {
              tag: 'c-icon',
              params: {
                path: mdiFlag,
                color: 'var(--c-primary-600)',
              },
            },
          },
        ],
      },
      population: { value: 5831404 },
      unemployment: { value: 4.8 },
      // items not present in the header definition can be added to be used as callback attributes
      code: { value: 'DK' },
    },
    {
      country: { value: 'Finland' },
      population: { value: 5529543 },
      unemployment: { value: 7.5 },
      code: { value: 'FI' },
    },
    {
      country: { value: 'Iceland' },
      population: { value: 366463 },
      unemployment: { value: 5.4 },
      code: { value: 'IS' },
    },
    {
      country: { value: 'Norway' },
      population: { value: 5379475 },
      unemployment: { value: 5.0 },
      code: { value: 'NO' },
    },
    {
      country: { value: 'Sweden' },
      population: { value: 10353442 },
      unemployment: { value: 8.7 },
      code: { value: 'SE' },
    },
  ];

  basicHeaders: CDataTableHeader[] = [
    {
      key: 'country',
      value: 'Country',
      align: 'center',
    },
    {
      key: 'population',
      value: 'Population (2020)',
    },
    {
      key: 'unemployment',
      value: 'Unemployment (%)',
    },
    {
      key: 'actions',
      value: null,
      sortable: false,
      align: 'end',
      children: [
        {
          value: 'Show Code',
          component: {
            tag: 'c-button',
            params: {
              text: true,
              size: 'small',
              title: 'Show Code',
              onClick: ({ data }) =>
                alert(`Country code for ${data['country'].value}: ${data['code'].value}`),
            },
          },
        },
      ],
    },
  ];
  // @example-end

  /*
  // @example-start|complex
  ngOnInit(): void {
    this.data = [...mockUsers];
  }
  // @example-end
  */

  /*
  // @example-start|complex
  import {
    CPaginationOptions,
    CDataTableFooterOptions,
    CDataTableHeader,
    CDataTableData,
    CToastType,
  } from 'csc-ui';
  // @example-end
  */

  // @example-start|complex
  expansionStatusText = '';

  singleSelection = false;

  headers: CDataTableHeader[] = [
    {
      key: 'id',
      value: 'Id',
      pinned: true,
      component: {
        tag: 'c-tag',
        params: {
          onClick: ({ event, data }) => {
            // stop clicking on the tag from opening the row details
            event.stopPropagation();

            console.log(`Row with an id of ${data?.['id']?.value} was clicked`);
          },
        },
      },
    },
    { key: 'firstName', value: 'First name' },
    { key: 'lastName', value: 'Last name' },
    {
      key: 'progress',
      value: 'Progress',
      width: '200px',
      component: {
        tag: 'c-progress-bar',
        injectValue: true,
        params: {
          style: {
            width: '100%',
          },
          hideDetails: true,
        },
      },
    },
    {
      key: 'progress2',
      value: 'Efficiency',
      width: '200px',
      component: {
        tag: 'c-progress-bar',
        injectValue: true,
        params: {
          style: {
            width: '100%',
          },
          hideDetails: true,
          color: '#830051',
        },
      },
    },
    {
      key: 'failure',
      value: 'Failure rate',
      width: '200px',
      component: {
        tag: 'c-progress-bar',
        injectValue: true,
        params: {
          style: {
            width: '100%',
          },
          hideDetails: true,
          color: 'red',
        },
      },
    },
    {
      key: 'salary',
      value: 'Salary',
      width: '200px',
      justify: 'end',
    },
    { key: 'email', value: 'Email', hidden: true },
    { key: 'city', value: 'City', hidden: false },
    {
      key: 'actions',
      value: null,
      sortable: false,
      pinned: true,
      align: 'end',
      children: [
        {
          value: 'Remove user',
          component: {
            tag: 'c-button',
            params: {
              text: true,
              path: mdiDelete,
              size: 'small',
              title: 'Remove user',
              onClick: ({ event, data }) => {
                // stop clicking on the button from opening the row details
                event.stopPropagation();

                this.onDelete(data['id'].value);
              },
            },
          },
        },
        {
          value: 'Add to favourites',
          component: {
            tag: 'c-button',
            params: {
              text: true,
              path: mdiHeartPlus,
              title: 'Add to favourites',
              size: 'small',
              onClick: ({ event, data }) => {
                // stop clicking on the button from opening the row details
                event.stopPropagation();

                console.log(
                  `${data['firstName'].value} ${data['lastName'].value} added to favourites`,
                );
              },
            },
          },
        },
      ],
    },
  ];

  data: CDataTableData[] = [];

  sortBy = 'id';

  direction = 'asc';

  footerOptions: CDataTableFooterOptions = {
    itemsPerPageOptions: [5, 10, 15, 20],
  };

  paginationOptions: CPaginationOptions = {
    itemCount: mockUsers.length,
    itemsPerPage: 10,
    currentPage: 1,
    startFrom: 0,
    endTo: 9,
  };

  selections: number[] = [];

  clearSelections() {
    const dataTable = document.getElementById('complex') as HTMLCDataTableElement;

    dataTable.clearSelections();
  }

  onSelection(event) {
    this.selections = event.detail;
  }

  onExpand(event) {
    const { row, active } = event.detail;

    const toasts = document.getElementById('toasts') as HTMLCToastsElement;

    this.expansionStatusText = `Row with an id of ${row.id} was ${active ? 'expanded' : 'closed'}`;

    toasts.addToast({
      message: this.expansionStatusText,
      duration: 3000,
      type: CToastType.Success,
    });
  }
  // @example-end

  // @example-start|paginated
  externalData = [];

  pagedData = [];

  externalHeaders: CDataTableHeader[] = [
    { key: 'name', value: 'Author' },
    { key: 'work_count', value: 'Works' },
    { key: 'top_work', value: 'Top work' },
    { key: 'top_subjects', value: 'Subjects', sortable: false },
  ];

  externalOptions: CPaginationOptions = {
    itemCount: this.externalData.length,
    itemsPerPage: 10,
    currentPage: 1,
    startFrom: 0,
    endTo: 9,
  };

  externalSortBy = 'name';

  externalDirection = 'asc';

  loading = false;

  textOverride = false;

  textOverrides = {
    // itemsPerPageText: 'Kohteita sivulla:',
    nextPage: 'Seuraava sivu',
    prevPage: 'Edellinen sivu',
    pageText: ({ start, end, count }) => `${start} - ${end} / ${count}`,
    pageOfText: ({ pageNumber, count }) => `Sivu ${pageNumber} / ${count}`,
  };

  constructor(private _ngZone: NgZone, private _http: HttpClient) {}

  ngOnInit(): void {
    // @example-skip-start
    this.data = [...mockUsers];
    // @example-skip-end
    this.getData();
  }

  getData() {
    if (this.loading) return;

    this.loading = true;

    const offset =
      this.externalOptions.currentPage * this.externalOptions.itemsPerPage -
      this.externalOptions.itemsPerPage;
    const limit = this.externalOptions.itemsPerPage;

    this._http
      .get(`https://openlibrary.org/search/authors.json?q=alvar&limit=${limit}&offset=${offset}`)
      .subscribe((data: any) => {
        this.externalData = (data.docs as any[]).reduce((items, item) => {
          items.push({
            name: {
              value: item.name,
            },
            work_count: {
              value: item.work_count,
            },
            top_work: {
              value: item.top_work,
            },
            top_subjects: {
              value: null,
              children: [
                ...(item.top_subjects || []).slice(0, 5).map((subject, index) => ({
                  key: `top_subject_${index}`,
                  value: subject,
                  component: {
                    tag: 'c-tag',
                    params: {
                      flat: true,
                    },
                  },
                })),
                ...(!item.top_subjects?.length ? [{ key: 'no_subjects', value: '-' }] : []),
              ],
            },
          });

          return items;
        }, []);

        // Update the item count
        this.externalOptions = {
          ...this.externalOptions,
          itemCount: data.numFound,
        };

        this.sortData();
      });
  }

  onDelete(id) {
    this._ngZone.run(() => {
      this.data = this.data.filter((row) => row['id'].value !== id);
    });
  }

  onPagination(event) {
    this.externalOptions = {
      ...this.externalOptions,
      ...event.detail,
    };

    this.getData();
  }

  onSort(event) {
    const { sortBy, direction } = event.detail;

    this.externalSortBy = sortBy;
    this.externalDirection = direction;

    this.getData();
  }

  sortData() {
    this.pagedData = this.externalData.sort((a, b) => {
      const valueA = a[this.externalSortBy].value;
      const valueB = b[this.externalSortBy].value;

      if (typeof valueA === 'string') {
        if (this.externalDirection === 'asc') {
          return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
        }

        return valueB.toLowerCase().localeCompare(valueA.toLowerCase());
      }

      if (typeof valueA === 'number') {
        if (this.externalDirection === 'asc') {
          return valueA - valueB;
        }

        return valueB - valueA;
      }
    });

    this.loading = false;
  }

  toggleTextOverride(event) {
    this._ngZone.run(() => {
      this.externalOptions = {
        ...this.externalOptions,
        textOverrides: event.detail ? this.textOverrides : undefined,
      };

      this.getData();
    });
  }
  // @example-end
}
