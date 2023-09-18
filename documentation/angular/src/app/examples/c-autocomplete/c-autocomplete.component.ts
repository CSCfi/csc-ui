import { Component, OnInit } from '@angular/core';
import { CAutocompleteItem } from '../../../../../../dist/types/types';
import countries from '../countries.json';
import { mdiEarth } from '@mdi/js';

@Component({
  selector: 'app-c-autocomplete',
  templateUrl: './c-autocomplete.component.html',
  styleUrls: ['./c-autocomplete.component.scss'],
})
export class CAutocompleteComponent implements OnInit {
  // @example-start|angular
  query: any;

  selection = null;

  items: CAutocompleteItem[] = Object.keys(countries)
    .map((key) => ({
      value: key,
      name: countries[key],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  addedTags: CAutocompleteItem[] = [];

  get filteredItems() {
    if (!this.query) return this.items;

    return this.items.filter((i) => i.name?.toLowerCase().includes(this.query?.toLowerCase()));
  }

  changeQuery(event) {
    this.query = event.detail;
  }

  addTag() {
    if (!!this.selection) this.addedTags.push(this.selection);

    this.selection = null;
    this.query = null;
  }

  removeTag(index) {
    this.addedTags.splice(index, 1);
  }
  // @example-end

  // @example-start|customMenu
  setValue(event: Event, item: CAutocompleteItem) {
    const autocomplete = document.querySelector(
      '#customListOfCountries',
    ) as HTMLCAutocompleteElement;

    autocomplete.setValue(event, item);
  }
  // @example-end

  // @example-start|returnValue
  searchString: any;

  tags: string[] = [];

  value = '';

  get countries() {
    if (!this.searchString) return this.items;

    return this.items.filter((i) =>
      i.name?.toLowerCase().includes(this.searchString?.toLowerCase()),
    );
  }

  onAddTag() {
    if (!!this.value) this.tags.push(this.value);

    this.value = null;
    this.searchString = null;
  }

  onQueryChange(event) {
    this.searchString = event.detail;
  }
  // @example-end

  constructor() {}

  mdiEarth = mdiEarth;

  ngOnInit(): void {}
}
