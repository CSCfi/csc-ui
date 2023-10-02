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
  mdiAlertDecagram,
  mdiWater,
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

  currentTheme = 'primary';

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
    mdiAlertDecagram,
    mdiWater,
  };

  themes = [
    {
      name: 'primary',
      styles: {
        '--c-icon-button-background-color': '#006778',
        '--c-icon-button-background-color-hover': '#66a4ae',
        '--c-icon-button-text-text-color': '#006778',
        '--c-icon-button-text-background-color-hover': 'grba(#006778, 0.1)',
      },
    },
    {
      name: 'secondary',
      styles: {
        '--c-icon-button-background-color': 'var(--c-secondary-600)',
        '--c-icon-button-background-color-hover': 'var(--c-secondary-400)',
        '--c-icon-button-text-text-color': 'var(--c-secondary-600)',
        '--c-icon-button-text-background-color-hover': 'var(--c-secondary-100)',
      },
    },
    {
      name: 'info',
      styles: {
        '--c-icon-button-background-color': 'var(--c-info-600)',
        '--c-icon-button-background-color-hover': 'var(--c-info-400)',
        '--c-icon-button-text-text-color': 'var(--c-info-600)',
        '--c-icon-button-text-background-color-hover': 'var(--c-info-100)',
      },
    },
    {
      name: 'link',
      styles: {
        '--c-icon-button-background-color': 'var(--c-link-600)',
        '--c-icon-button-background-color-hover': 'var(--c-link-400)',
        '--c-icon-button-text-text-color': 'var(--c-link-600)',
        '--c-icon-button-text-background-color-hover': 'var(--c-link-100)',
      },
    },
    {
      name: 'success',
      styles: {
        '--c-icon-button-background-color': 'var(--c-success-600)',
        '--c-icon-button-background-color-hover': 'var(--c-success-400)',
        '--c-icon-button-text-text-color': 'var(--c-success-600)',
        '--c-icon-button-text-background-color-hover': 'var(--c-success-100)',
      },
    },
    {
      name: 'error',
      styles: {
        '--c-icon-button-background-color': 'var(--c-error-600)',
        '--c-icon-button-background-color-hover': 'var(--c-error-400)',
        '--c-icon-button-text-text-color': 'var(--c-error-600)',
        '--c-icon-button-text-background-color-hover': 'var(--c-error-100)',
      },
    },
  ];

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
