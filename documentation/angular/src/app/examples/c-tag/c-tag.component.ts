import { Component } from '@angular/core';

@Component({
  selector: 'app-c-tag',
  templateUrl: './c-tag.component.html',
  styleUrls: ['./c-tag.component.scss'],
})
export class CTagComponent {
  template = `<c-tag [active]="active[0]" (click)="toggleActive(0)">One</c-tag>
<c-tag [active]="active[1]" (click)="toggleActive(1)">Two</c-tag>
<c-tag [active]="active[2]" (click)="toggleActive(2)">Three</c-tag>`;

  script = `active = [false, true, false];

toggleActive(index: number) {
  this.active[index] = !this.active[index];
}`;

  // @example-start|basic
  active = [false, true, false];

  toggleActive(index: number) {
    this.active[index] = !this.active[index];
  }
  // @example-end
}
