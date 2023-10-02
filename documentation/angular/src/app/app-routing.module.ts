import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BasicTemplateComponent } from './basic-template/basic-template.component';
import { GettingStartedAngularComponent } from './getting-started-angular/getting-started-angular.component';
import { GettingStartedHtmlComponent } from './getting-started-html/getting-started-html.component';
import { GettingStartedVueLegacyComponent } from './getting-started-vue-legacy/getting-started-vue-legacy.component';
import { GettingStartedVueComponent } from './getting-started-vue/getting-started-vue.component';
import { TypesComponent } from './types/types.component';
import { MigrationGuideComponent } from './migration-guide/migration-guide.component';
import { ViewerResolverService } from './viewer/viewer-resolver.service';
import { ViewerComponent } from './viewer/viewer.component';

const appRoutes: Routes = [
  {
    path: '',
    resolve: [ViewerResolverService],
    children: [
      {
        path: '',
        component: AboutComponent,
        resolve: [ViewerResolverService],
      },
      {
        path: 'migration-guide',
        component: MigrationGuideComponent,
        resolve: [ViewerResolverService],
      },
      {
        path: 'types',
        component: TypesComponent,
        resolve: [ViewerResolverService],
      },
      {
        path: 'getting-started/angular',
        component: GettingStartedAngularComponent,
        resolve: [ViewerResolverService],
      },
      {
        path: 'getting-started/html',
        component: GettingStartedHtmlComponent,
        resolve: [ViewerResolverService],
      },
      {
        path: 'getting-started/vue',
        component: GettingStartedVueComponent,
        resolve: [ViewerResolverService],
      },
      {
        path: 'getting-started/vue-2',
        component: GettingStartedVueLegacyComponent,
        resolve: [ViewerResolverService],
      },
      {
        path: 'templates/basic-template',
        component: BasicTemplateComponent,
        resolve: [ViewerResolverService],
      },
      {
        path: ':tag',
        component: ViewerComponent,
        resolve: [ViewerResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
