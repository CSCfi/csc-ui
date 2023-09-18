import {
  ChangeDetectorRef,
  AfterViewInit,
  AfterContentChecked,
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { mdiXml } from '@mdi/js';
import docs from '../../../../../../docs.json';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent implements AfterViewInit, AfterContentChecked, OnInit {
  @Input() title: string;

  @Input() subtitle: string;

  @Input() name: string;

  @Input() cols: string;

  @Input() rows: string;

  @Input() component: string;

  @ViewChild('example') example;

  code = '';

  scriptCode = '';

  allowedAttributes = [];

  showCode = false;

  examples = null;

  mdiXml = mdiXml;

  constructor(private cdref: ChangeDetectorRef) {
    const attrs = docs.components?.reduce(
      (items, component) => {
        items.push(...component.props.map((prop) => prop.attr || prop.name));

        return items;
      },
      ['class', 'style', 'slot'],
    );
    this.allowedAttributes = [...new Set(attrs)];
  }

  async ngOnInit() {
    if (!this.component) {
      this.examples = {};

      return;
    }

    const script = await import(`../example-data/${this.component}.script.js`);
    const template = await import(`../example-data/${this.component}.template.js`);

    this.examples = {
      script,
      template,
    };

    this.initializeExamples();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngAfterViewInit(): void {
    this.initializeExamples();
  }

  initializeExamples() {
    this.code = this.examples?.template?.[this.name];
    this.scriptCode = this.examples?.script?.[this.name];

    this.cdref.detectChanges();
  }
}
