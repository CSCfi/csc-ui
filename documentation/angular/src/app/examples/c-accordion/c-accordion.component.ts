import { Component, OnInit } from '@angular/core';
import { mdiAccessPoint, mdiCamera, mdiNas } from '@mdi/js';

@Component({
  selector: 'app-c-accordion',
  templateUrl: './c-accordion.component.html',
  styleUrls: ['./c-accordion.component.scss'],
})
export class CAccordionComponent implements OnInit {
  constructor() {}

  mdiAccessPoint = mdiAccessPoint;
  mdiNas = mdiNas;
  mdiCamera = mdiCamera;

  ngOnInit(): void {}
}
