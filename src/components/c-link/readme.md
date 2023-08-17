# c-link



<!-- Auto Generated Below -->


## Overview

Basic hyperlink component

## Properties

| Property    | Attribute    | Description                             | Type                                                                                                                                                                                                                                             | Default     |
| ----------- | ------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `color`     | `color`      | Use another CSC color                   | `"dark-grey" \| "error" \| "info" \| "light-grey" \| "light-grey-blue" \| "lightest-grey" \| "link" \| "mid-grey" \| "primary" \| "primary-ghost" \| "primary-ghost-hover" \| "primary-hover" \| "primary-text-hover" \| "success" \| "warning"` | `'link'`    |
| `href`      | `href`       | Url of link                             | `string`                                                                                                                                                                                                                                         | `null`      |
| `iconAfter` | `icon-after` | Icon position                           | `boolean`                                                                                                                                                                                                                                        | `undefined` |
| `iconFill`  | `icon-fill`  | Fill color for the svg icon             | `"dark-grey" \| "error" \| "info" \| "light-grey" \| "light-grey-blue" \| "lightest-grey" \| "link" \| "mid-grey" \| "primary" \| "primary-ghost" \| "primary-ghost-hover" \| "primary-hover" \| "primary-text-hover" \| "success" \| "warning"` | `'link'`    |
| `iconStyle` | --           | Icon style overrides                    | `{}`                                                                                                                                                                                                                                             | `{}`        |
| `path`      | `path`       | Path for the svg icon                   | `string`                                                                                                                                                                                                                                         | `null`      |
| `target`    | `target`     | regular target attribute of a hyperlink | `string`                                                                                                                                                                                                                                         | `null`      |
| `underline` | `underline`  | Display line under the link             | `boolean`                                                                                                                                                                                                                                        | `false`     |
| `weight`    | `weight`     | Customisable font weight                | `string`                                                                                                                                                                                                                                         | `'600'`     |


## Dependencies

### Depends on

- [c-icon](../c-icon)

### Graph
```mermaid
graph TD;
  c-link --> c-icon
  style c-link fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
