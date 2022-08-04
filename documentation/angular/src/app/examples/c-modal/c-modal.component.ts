import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-c-modal',
  templateUrl: './c-modal.component.html',
  styleUrls: ['./c-modal.component.scss'],
})
export class CModalComponent implements OnInit {
  // @example-start|basic
  modal = false;
  // @example-end

  // @example-start|dismissable
  dismissableModal = false;
  // @example-end

  // @example-start|maxWidth
  numericWidthModal = false;

  stringWidthModal = false;
  // @example-end

  constructor() {}

  ngOnInit(): void {}
}
