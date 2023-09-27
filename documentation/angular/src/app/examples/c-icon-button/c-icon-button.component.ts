import { Component, OnInit } from '@angular/core';
import { mdiStar, mdiFire } from '@mdi/js';
@Component({
  selector: 'app-c-icon-button',
  templateUrl: './c-icon-button.component.html',
  styleUrls: ['./c-icon-button.component.scss'],
})
export class CIconButtonComponent implements OnInit {
  mdiStar = mdiStar;

  mdiAlert = mdiFire;

  constructor() {}

  ngOnInit(): void {}
}
