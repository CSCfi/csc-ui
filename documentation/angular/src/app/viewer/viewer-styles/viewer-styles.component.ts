import { Component, Input, OnInit } from '@angular/core';
import { ComponentData } from 'src/interfaces/documentation';

@Component({
  selector: 'app-viewer-styles',
  templateUrl: './viewer-styles.component.html',
  styleUrls: ['./viewer-styles.component.scss'],
})
export class ViewerStylesComponent implements OnInit {
  @Input() data: ComponentData;

  constructor() {}

  ngOnInit(): void {}
}
