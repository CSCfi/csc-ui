import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import {
  angularOutputTarget,
  ValueAccessorConfig,
} from '@stencil/angular-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['c-select', 'c-autocomplete', 'c-content-switcher'],
    event: 'changeValue',
    targetAttr: 'value',
    type: 'select',
  },
];

export const config: Config = {
  namespace: 'cscwebcomponents',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'component-library',
      directivesProxyFile:
        '../component-library-angular/src/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    {
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: 'docs.json',
    },
    {
      type: 'docs-vscode',
      file: 'vscode-data.json',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/styles/global.scss',
        'src/styles/variables.scss',
      ],
    }),
  ],
  extras: {
    experimentalImportInjection: true,
  },
};
