import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-table',
  templateUrl: './c-table.component.html',
  styleUrls: ['./c-table.component.scss'],
})
export class CTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // @example-start|basic|responsive
  headers = ['Id', 'Name', 'Ssn'];

  users = [
    {
      id: '19-9985829',
      name: 'Trueman Stoving',
      ssn: '739-44-5303',
    },
    {
      id: '29-6327242',
      name: 'August Cosslett',
      ssn: '851-25-1988',
    },
    {
      id: '72-2577427',
      name: 'Ethe Kent',
      ssn: '624-36-3386',
    },
    {
      id: '28-0732117',
      name: 'Harbert Doey',
      ssn: '719-22-1203',
    },
    {
      id: '39-6848867',
      name: 'Sidonnie Lamas',
      ssn: '442-24-1083',
    },
  ];
  // @example-end
}
