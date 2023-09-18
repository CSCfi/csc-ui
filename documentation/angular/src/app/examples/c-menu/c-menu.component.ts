import { Component, OnInit } from '@angular/core';
import { mdiDotsHorizontal, mdiInformationOutline, mdiEmailOutline } from '@mdi/js';
import { CMenuCustomTrigger, CToastType } from '../../../../../../src/types';

@Component({
  selector: 'app-c-menu',
  templateUrl: './c-menu.component.html',
  styleUrls: ['./c-menu.component.scss'],
})
export class CMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  mdiEmailOutline = mdiEmailOutline;

  // @example-start|basic|nohover|small|simple|custom
  items = [
    { name: 'Item 1', action: () => this.onItemClick('Item 1 selected') },
    { name: 'Item 2', action: () => this.onItemClick('Item 2 selected') },
    { name: 'Item 3', action: () => this.onItemClick('Item 3 selected'), disabled: true },
    {
      name: 'Item 4',
      action: () => this.onItemClick('Item 4 selected'),
      icon: mdiInformationOutline,
      iconPosition: 'end',
    },
    { name: 'Item 5', action: () => this.onItemClick('Item 5 selected') },
    { name: 'Item 6', action: () => this.onItemClick('Item 6 selected') },
    { name: 'Item 7', action: () => this.onItemClick('Item 7 selected') },
    { name: 'Item 8', action: () => this.onItemClick('Item 8 selected') },
    { name: 'Item 9', action: () => this.onItemClick('Item 9 selected') },
    { name: 'Item 10', action: () => this.onItemClick('Item 10 selected') },
    { name: 'Item 11', action: () => this.onItemClick('Item 11 selected') },
    { name: 'Item 12', action: () => this.onItemClick('Item 12 selected') },
    { name: 'Item 13', action: () => this.onItemClick('Item 13 selected') },
    { name: 'Item 14', action: () => this.onItemClick('Item 14 selected') },
    { name: 'Item 15', action: () => this.onItemClick('Item 15 selected') },
    { name: 'Item 16', action: () => this.onItemClick('Item 16 selected') },
    { name: 'Item 17', action: () => this.onItemClick('Item 17 selected') },
    { name: 'Item 18', action: () => this.onItemClick('Item 18 selected') },
    { name: 'Item 19', action: () => this.onItemClick('Item 19 selected') },
    { name: 'Item 20', action: () => this.onItemClick('Item 20 selected') },
  ];

  onItemClick(message: string) {
    const toasts = document.getElementById('toasts') as HTMLCToastsElement;

    toasts.addToast({
      message,
      duration: 3000,
      type: CToastType.Success,
    });
  }
  // @example-end

  // @example-start|custom
  customTriggerProps: CMenuCustomTrigger = {
    value: 'Custom trigger',
    component: {
      tag: 'c-button',
      params: {
        outlined: true,
        path: mdiDotsHorizontal,
        title: 'Menu with custom trigger',
        size: 'small',
      },
    },
  };
  // @example-end
}
