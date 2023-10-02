import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-migration-guide',
  templateUrl: './migration-guide.component.html',
  styleUrls: ['./migration-guide.component.scss'],
})
export class MigrationGuideComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  cLinkIconUsage = `<c-link
  href="https://csc.fi"
  target="_blank"
  [path]="mdiOpenInNew"
  icon-fill="primary"
  icon-after
  [iconStyle]="{marginLeft: '8px'}"
>
  Link with icon
</c-link>`;

  cLinkIconUsageNew = `<c-link
  href="https://csc.fi"
  target="_blank"
>
  Link with icon
  <c-icon [path]="mdiOpenInNew" color="var(--c-primary-600)" size="18"></c-icon>
</c-link>`;

  cTagsUsage = `<c-tag closeable (click)="removeTag(1)">One</c-tag>
<c-tag closeable (click)="removeTag(2)">Two</c-tag>
<c-tag closeable (click)="removeTag(3)">Three</c-tag>`;

  cTagsUsageNew = `<c-tags>
  <c-tag
    [active]="tags[0].active"
    closeable
    (close)="removeTag(tags[0])"
    (click)="tags[0].active = !tags[0].active"
  >
    One
  </c-tag>

  <c-tag
    [active]="tags[1].active"
    closeable
    (close)="removeTag(tags[1])"
    (click)="tags[1].active = !tags[1].active"
  >
    Two
  </c-tag>

  <c-tag
    [active]="tags[2].active"
    closeable
    (close)="removeTag(tags[2])"
    (click)="tags[2].active = !tags[2].active"
  >
    Three
  </c-tag>
</c-tags>`;
}
