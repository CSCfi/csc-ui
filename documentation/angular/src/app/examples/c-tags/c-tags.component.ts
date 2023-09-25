import { Component } from '@angular/core';

@Component({
  selector: 'app-c-tags',
  templateUrl: './c-tags.component.html',
  styleUrls: ['./c-tags.component.scss'],
})
export class CTagsComponent {
  // @example-start|basic
  active = [false, true, false];

  toggleActive(index: number) {
    this.active[index] = !this.active[index];
  }
  // @example-end

  // @example-start|closeable
  createTags() {
    return [
      { id: 1, label: 'Tag One', active: false },
      { id: 2, label: 'Tag Two', active: false },
      { id: 3, label: 'Tag Three', active: false },
    ];
  }

  tags = this.createTags();

  removeTag(id: number) {
    this.tags = this.tags.filter((tag) => tag.id !== id);
  }

  resetTags() {
    this.tags = this.createTags();
  }

  toggleActiveTag(id: number) {
    const tag = this.tags.find((tag) => tag.id === id);
    tag.active = !tag.active;
  }
  // @example-end
}
