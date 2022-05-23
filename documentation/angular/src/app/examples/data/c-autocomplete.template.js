
/**
 * Examples for c-autocomplete.
 * Automatically generated at 5/23/2022, 5:59:55 PM.
 *
 * ⚠️ DO NOT EDIT THESE MANUALLY AS THEY WILL BE OVERWRITTEN IN THE NEXT BUILD!
 */

export const angular = `<c-row gap="8">
  <c-autocomplete
    id="listOfCountries"
    label="Countries"
    cControl
    hide-details
    [items]="filteredItems"
    [query]="query"
    (changeQuery)="changeQuery($event)"
    [itemsPerPage]="10"
    [(ngModel)]="selection"
    style="flex: 1"
  >
    <i class="mdi mdi-earth" slot="pre"></i>
  </c-autocomplete>

  <c-button (click)="addTag()" (keyup.enter)="addTag()">Add</c-button>
</c-row>

<div class="mt-3">
  <c-tag
    *ngFor="let tag of addedTags; let i = index"
    closeable
    (click)="removeTag(i)"
    (keyup.enter)="removeTag(i)"
  >
    {{ tag.name }}
  </c-tag>
</div>`;

export const returnValue = `<c-row gap="8">
  <c-autocomplete
    [(ngModel)]="value"
    [items]="countries"
    [query]="searchString"
    (changeQuery)="onQueryChange($event)"
    [itemsPerPage]="10"
    label="Countries"
    return-value
    hide-details
    cControl
  ></c-autocomplete>
  <c-button (click)="onAddTag()" (keyup.enter)="onAddTag()">Add</c-button>
</c-row>

<p style="margin: 16px 0 0">
  Added values:
  <c-tag flat>{{ tags.length }}</c-tag>
</p>
<ul>
  <li *ngFor="let tag of tags">
    {{ tag }}
  </li>
  <li *ngIf="!tags.length">No added values</li>
</ul>`;