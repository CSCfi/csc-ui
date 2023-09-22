import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import docs from '../../../../../docs.json';
import { ComponentDataService } from '../services/component-data.service';
import { parseComponents } from '../utils/utils';

@Injectable({ providedIn: 'root' })
export class ViewerResolverService implements Resolve<any> {
  constructor(private _componentDataService: ComponentDataService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const activeComponent = parseComponents(docs).find(
      (component) => component.tag === route.params['tag'],
    );

    this._componentDataService.setActiveComponent(activeComponent);

    return activeComponent;
  }
}
