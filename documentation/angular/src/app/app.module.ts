import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CscUiAccessorModule } from 'csc-ui-accessor';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CButtonComponent } from './examples/c-button/c-button.component';
import { CCardComponent } from './examples/c-card/c-card.component';
import { CTabButtonsComponent } from './examples/c-tab-buttons/c-tab-buttons.component';
import { CIconButtonComponent } from './examples/c-icon-button/c-icon-button.component';
import { CSwitchComponent } from './examples/c-switch/c-switch.component';
import { CTabsComponent } from './examples/c-tabs/c-tabs.component';
import { CTagComponent } from './examples/c-tag/c-tag.component';
import { CTextFieldComponent } from './examples/c-text-field/c-text-field.component';
import { CTitleComponent } from './examples/c-title/c-title.component';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { ExampleComponent } from './examples/example/example.component';
import { ViewerAttributesComponent } from './viewer/viewer-attributes/viewer-attributes.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ViewerEventsComponent } from './viewer/viewer-events/viewer-events.component';
import { ViewerSlotsComponent } from './viewer/viewer-slots/viewer-slots.component';
import { CAutocompleteComponent } from './examples/c-autocomplete/c-autocomplete.component';
import { CCheckboxComponent } from './examples/c-checkbox/c-checkbox.component';
import { CSwiperComponent } from './examples/c-swiper/c-swiper.component';
import { CPaginationComponent } from './examples/c-pagination/c-pagination.component';
import { MenuGroupsPipe } from './pipes/menu-groups.pipe';
import { CProgressBarComponent } from './examples/c-progress-bar/c-progress-bar.component';
import { CAccordionComponent } from './examples/c-accordion/c-accordion.component';
import { CMenuComponent } from './examples/c-menu/c-menu.component';
import { CModalComponent } from './examples/c-modal/c-modal.component';
import { CRadioGroupComponent } from './examples/c-radio-group/c-radio-group.component';
import { CLoaderComponent } from './examples/c-loader/c-loader.component';
import { CNotificationComponent } from './examples/c-notification/c-notification.component';
import { CSelectComponent } from './examples/c-select/c-select.component';
import { CToolbarComponent } from './examples/c-toolbar/c-toolbar.component';
import { CSidenavigationComponent } from './examples/c-sidenavigation/c-sidenavigation.component';
import { CLinkComponent } from './examples/c-link/c-link.component';
import { BasicTemplateComponent } from './basic-template/basic-template.component';
import { GettingStartedAngularComponent } from './getting-started-angular/getting-started-angular.component';
import { AboutComponent } from './about/about.component';
import { GettingStartedHtmlComponent } from './getting-started-html/getting-started-html.component';
import { GettingStartedVueComponent } from './getting-started-vue/getting-started-vue.component';
import { CLoginCardComponent } from './examples/c-login-card/c-login-card.component';
import { CDataTableComponent } from './examples/c-data-table/c-data-table.component';
import { CRowComponent } from './examples/c-row/c-row.component';
import { CStatusComponent } from './examples/c-status/c-status.component';
import { CToastComponent } from './examples/c-toast/c-toast.component';
import { CToastsComponent } from './examples/c-toasts/c-toasts.component';
import { ViewerMethodsComponent } from './viewer/viewer-methods/viewer-methods.component';
import { CAlertComponent } from './examples/c-alert/c-alert.component';
import { TypesComponent } from './types/types.component';
import { CStepsComponent } from './examples/c-steps/c-steps.component';
import { GettingStartedVueLegacyComponent } from './getting-started-vue-legacy/getting-started-vue-legacy.component';
import { CIconComponent } from './examples/c-icon/c-icon.component';
import { COtpInputComponent } from './examples/c-otp-input/c-otp-input.component';

@NgModule({
  declarations: [
    AppComponent,
    CButtonComponent,
    CCardComponent,
    CTabButtonsComponent,
    CIconButtonComponent,
    CSwitchComponent,
    CTabsComponent,
    CTagComponent,
    CTextFieldComponent,
    CTitleComponent,
    DynamicComponentDirective,
    ExampleComponent,
    ViewerAttributesComponent,
    ViewerComponent,
    ViewerEventsComponent,
    ViewerSlotsComponent,
    CCheckboxComponent,
    CAutocompleteComponent,
    CSwiperComponent,
    CPaginationComponent,
    MenuGroupsPipe,
    CProgressBarComponent,
    CAccordionComponent,
    CMenuComponent,
    CModalComponent,
    CLoaderComponent,
    CNotificationComponent,
    CSelectComponent,
    CRadioGroupComponent,
    CToolbarComponent,
    CSidenavigationComponent,
    CLinkComponent,
    BasicTemplateComponent,
    GettingStartedAngularComponent,
    AboutComponent,
    GettingStartedHtmlComponent,
    GettingStartedVueComponent,
    CLoginCardComponent,
    CDataTableComponent,
    CRowComponent,
    CStatusComponent,
    CToastComponent,
    CToastsComponent,
    ViewerMethodsComponent,
    CAlertComponent,
    TypesComponent,
    CStepsComponent,
    GettingStartedVueLegacyComponent,
    CIconComponent,
    COtpInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HighlightModule,
    CscUiAccessorModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        lineNumbersLoader: () => import('highlightjs-line-numbers.js'), // Optional, only if you want the line numbers
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
