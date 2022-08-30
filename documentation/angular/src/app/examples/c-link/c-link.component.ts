import { Component, OnInit } from '@angular/core';
import { mdiFolder } from '@mdi/js';

@Component({
  selector: 'app-c-link',
  templateUrl: './c-link.component.html',
  styleUrls: ['./c-link.component.scss'],
})
export class CLinkComponent implements OnInit {
  mdiFolder = mdiFolder;

  constructor() {}

  ngOnInit(): void {}
}
