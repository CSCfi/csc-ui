import { Component, OnInit } from '@angular/core';
import { mdiEmailOutline } from '@mdi/js';
@Component({
  selector: 'app-c-toolbar',
  templateUrl: './c-toolbar.component.html',
  styleUrls: ['./c-toolbar.component.scss'],
})
export class CToolbarComponent implements OnInit {
  constructor() {}

  mdiEmailOutline = mdiEmailOutline;

  ngOnInit(): void {}

  items = [
    { name: 'Item 1', action: () => alert('Item 1 selected') },
    { name: 'Item 2', action: () => alert('Item 2 selected') },
    { name: 'Item 3', action: () => alert('Item 3 selected'), disabled: true },
    { name: 'Item 4', action: () => alert('Item 4 selected') },
  ];
}
