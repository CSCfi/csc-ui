# c-content-switcher



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute   | Description                | Type                   | Default     |
| -------------- | ----------- | -------------------------- | ---------------------- | ----------- |
| `hostDisabled` | `disabled`  | Disable tab buttons        | `boolean`              | `false`     |
| `mandatory`    | `mandatory` | Always require a selection | `boolean`              | `false`     |
| `size`         | `size`      | Size of the buttons        | `"default" \| "small"` | `'default'` |
| `value`        | `value`     | Value of tab buttons       | `number \| string`     | `0`         |


## Events

| Event         | Description                | Type                            |
| ------------- | -------------------------- | ------------------------------- |
| `changeValue` | Emit changes to the parent | `CustomEvent<number \| string>` |


## Slots

| Slot             | Description                            |
| ---------------- | -------------------------------------- |
| `"Default slot"` | Default slot for the c-button elements |


## CSS Custom Properties

| Name                                            | Description                              |
| ----------------------------------------------- | ---------------------------------------- |
| `--c-tab-buttons-active-background-color`       | Active tab button background color       |
| `--c-tab-buttons-active-background-color-hover` | Active tab button hover background color |
| `--c-tab-buttons-active-text-color`             | Active tab button text color             |
| `--c-tab-buttons-background-color`              | Tab button background color              |
| `--c-tab-buttons-background-color-hover`        | Tab button hover background color        |
| `--c-tab-buttons-border-color`                  | Tab button border color                  |
| `--c-tab-buttons-border-radius`                 | Tab buttons border radius                |
| `--c-tab-buttons-text-color`                    | Tab button text color                    |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
