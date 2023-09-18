import { Component, OnInit } from '@angular/core';
import { ComponentData } from 'src/interfaces/documentation';
import { ComponentDataService } from './services/component-data.service';
import { parseComponents } from './utils/utils';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import docs from '../../../../docs.json';
import { map, Observable, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { VersionService } from './services/version.service';
import {
  mdiMagnify,
  mdiInformationOutline,
  mdiAngular,
  mdiLanguageHtml5,
  mdiVuejs,
  mdiLanguageTypescript,
} from '@mdi/js';

interface ComponentGroup {
  name: string;
  components: ComponentData[];
  visible: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  routeSubscription: Subscription;

  selectedComponent = {};

  components = [];

  groups = [];

  groupedComponents: ComponentGroup[] = [];

  activeComponent: ComponentData;

  url = null;

  active: string = null;

  icons = {
    mdiMagnify,
    mdiInformationOutline,
    mdiAngular,
    mdiLanguageHtml5,
    mdiVuejs,
    mdiLanguageTypescript,
  };

  constructor(
    public componentDataService: ComponentDataService,
    private _breakpointObserver: BreakpointObserver,
    private _router: Router,
    public versionService: VersionService,
  ) {
    this.components = parseComponents(docs);
    this.groupedComponents = this.getGroupedComponents();
    this.componentDataService.activeComponent$.subscribe((activeComponent) => {
      this.activeComponent = activeComponent;
      this._openGroupOfActiveComponent();
    });
  }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  isMobile$: Observable<boolean> = this._breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(map((obs) => obs.matches));

  filterComponents(event: Event) {
    const query = (event.target as HTMLInputElement).value;

    this.groupedComponents = this.getGroupedComponents(query, true);
  }

  navigate(event, tag) {
    event.stopPropagation();
    this._router.navigate([`/${tag}`]);
  }

  getGroupedComponents(query = null, visible = false): ComponentGroup[] {
    return this.components
      .filter((component) => {
        if (!query) return component;

        return component.tag.includes(query);
      })
      .reduce((groups: ComponentGroup[], component) => {
        const groupName = (
          component.docsTags.find((docsTag) => docsTag.name === 'group')?.text || 'ungrouped'
        ).toLowerCase();
        const group = groups.find((group) => group.name === groupName);

        if (!group) {
          groups.push({ name: groupName, components: [component], visible: visible && !!query });

          return groups;
        }

        group.components.push(component);

        return groups;
      }, [] as ComponentGroup[])
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  public open(item = {}) {
    this._closeAll();
    this.groupedComponents = this.groupedComponents.map((component) => ({
      ...component,
      visible: item === component,
    }));
  }

  private _closeAll() {
    this.active = null;
  }

  private _openGroupOfActiveComponent() {
    const activeGroup = this.groupedComponents.find((group) =>
      group.components.some((component) => component.tag === this.activeComponent?.tag),
    );

    if (activeGroup) {
      activeGroup.visible = true;
    }
  }
}
