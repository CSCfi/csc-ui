import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import { mdiDelete, mdiHeartPlus } from '@mdi/js';
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
      country: { value: 'Denmark' },
      population: { value: 5831404 },
      unemployment: { value: 4.8 },
    },
    {
      country: { value: 'Finland' },
      population: { value: 5529543 },
      unemployment: { value: 7.5 },
    },
    {
      country: { value: 'Iceland' },
      population: { value: 366463 },
      unemployment: { value: 5.4 },
    },
    {
      country: { value: 'Norway' },
      population: { value: 5379475 },
      unemployment: { value: 5.0 },
    },
    {
      country: { value: 'Sweden' },
      population: { value: 10353442 },
      unemployment: { value: 8.7 },
    },
  ];

  basicHeaders: CDataTableHeader[] = [
    {
      key: 'country',
      value: 'Country',
    },
    {
      key: 'population',
      value: 'Population (2020)',
    },
    {
      key: 'unemployment',
      value: 'Unemployment (%)',
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

  headers: CDataTableHeader[] = [
    {
      key: 'id',
      value: 'Id',
      component: {
        tag: 'c-tag',
        params: {
          onClick: ({ data }) =>
            console.log(`Row with an id of ${data?.['id']?.value} was clicked`),
        },
      },
    },
    { key: 'firstName', value: 'First name' },
    { key: 'lastName', value: 'Last name' },
    {
      key: 'progress',
      value: 'Progress',
      width: '128px',
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
    { key: 'email', value: 'Email', hidden: true },
    { key: 'city', value: 'City', hidden: true },
    {
      key: 'actions',
      value: null,
      sortable: false,
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
              onClick: ({ data }) => this.onDelete(data['id'].value),
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
              onClick: ({ data }) =>
                console.log(
                  `${data['firstName'].value} ${data['lastName'].value} added to favourites`,
                ),
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
  // @example-end
}
