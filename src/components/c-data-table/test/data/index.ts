import { mdiFlag } from '@mdi/js';
import { CDataTableData, CDataTableHeader } from '../../../../components';

export const basicData: CDataTableData[] = [
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

export const basicHeaders: CDataTableHeader[] = [
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
              alert(
                'Country code for ' +
                  data.country.value +
                  ': ' +
                  data.code.value +
                  '',
              ),
          },
        },
      },
    ],
  },
];
