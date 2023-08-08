import { Component, OnInit } from '@angular/core';
import { mdiXml, mdiHome, mdiAlarm, mdiLogout } from '@mdi/js';
@Component({
  selector: 'app-basic-template',
  templateUrl: './basic-template.component.html',
  styleUrls: ['./basic-template.component.scss'],
})
export class BasicTemplateComponent implements OnInit {
  icons = {
    mdiXml,
    mdiHome,
    mdiAlarm,
    mdiLogout,
  };

  template = `<c-main>
  <c-toolbar>
    <c-csc-logo></c-csc-logo>
    Application name
    <c-spacer></c-spacer>
    <c-navigationbutton></c-navigationbutton>
  </c-toolbar>

  <c-row>
    <c-sidenavigation>
      <c-sidenavigationitem active>
        <div slot="main">
          <span class="mdi mdi-home"></span>
          Home
        </div>
      </c-sidenavigationitem>

      <c-sidenavigationitem>
        <div slot="main">
          <span class="mdi mdi-alarm"></span>
          Something
        </div>
      </c-sidenavigationitem>

      <c-sidenavigationitem slot="bottom">
        <div slot="main">
          <span class="mdi mdi-logout"></span>
          Logout
        </div>
      </c-sidenavigationitem>
    </c-sidenavigation>

    <c-flex>
      <c-container class="padding">
        <c-card>
          <c-card-title>The title of the card</c-card-title>
          <c-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </c-card-content>
          <c-card-actions>
            <c-button>Confirm</c-button>
          </c-card-actions>
        </c-card>
      </c-container>
    </c-flex>
  </c-row>
</c-main>`;
  showCode = false;
  constructor() {}

  ngOnInit(): void {}
}
