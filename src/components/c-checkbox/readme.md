# c-checkbox



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description                      | Type      | Default            |
| --------------- | --------------- | -------------------------------- | --------- | ------------------ |
| `disabled`      | `disabled`      | Disable the checkbox             | `boolean` | `false`            |
| `hideDetails`   | `hide-details`  | Hide the hint and error messages | `boolean` | `false`            |
| `hint`          | `hint`          | Hint text for the input          | `string`  | `''`               |
| `indeterminate` | `indeterminate` | Indeterminate state              | `boolean` | `false`            |
| `label`         | `label`         | Element label                    | `string`  | `''`               |
| `required`      | `required`      | Set as required                  | `boolean` | `false`            |
| `valid`         | `valid`         | Set the validity of the input    | `boolean` | `true`             |
| `validation`    | `validation`    | Custom validation message        | `string`  | `'Required field'` |
| `value`         | `value`         | Is the element checked           | `boolean` | `false`            |


## Events

| Event         | Description                                    | Type               |
| ------------- | ---------------------------------------------- | ------------------ |
| `changeValue` | Triggered when element is checked or unchecked | `CustomEvent<any>` |


## Slots

| Slot             | Description                |
| ---------------- | -------------------------- |
| `"Default slot"` | Default slot for the label |


## CSS Custom Properties

| Name                                  | Description                     |
| ------------------------------------- | ------------------------------- |
| `--c-checkbox-active-color`           | Active checkbox color           |
| `--c-checkbox-background-color-hover` | Checkbox hover background color |
| `--c-checkbox-color`                  | Checkbox color                  |
| `--c-checkbox-disabled-color`         | Disabled checkbox color         |


## Dependencies

### Used by

 - [c-data-table](../c-data-table)

### Depends on

- [c-ripple](../c-ripple)

### Graph
```mermaid
graph TD;
  c-checkbox --> c-ripple
  c-data-table --> c-checkbox
  style c-checkbox fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
