import { Component, OnInit } from '@angular/core';
import { mdiStar } from '@mdi/js';
@Component({
  selector: 'app-c-icon-button',
  templateUrl: './c-icon-button.component.html',
  styleUrls: ['./c-icon-button.component.scss'],
})
export class CIconButtonComponent implements OnInit {
  mdiStar = mdiStar;

  constructor() {}

  ngOnInit(): void {}
}
