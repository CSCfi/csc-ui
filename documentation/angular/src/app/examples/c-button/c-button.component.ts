import { Component, OnInit } from '@angular/core';
import { mdiLogin, mdiArrowRight, mdiArrowLeft } from '@mdi/js';

@Component({
  selector: 'app-c-button',
  templateUrl: './c-button.component.html',
  styleUrls: ['./c-button.component.scss'],
})
export class CButtonComponent implements OnInit {
  constructor() {}

  mdiLogin = mdiLogin;

  mdiArrowRight = mdiArrowRight;

  mdiArrowLeft = mdiArrowLeft;

  ngOnInit(): void {}
}
