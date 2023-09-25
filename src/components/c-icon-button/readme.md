# c-icon-button

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                         | Type                                | Default     |
| ---------- | ---------- | ----------------------------------- | ----------------------------------- | ----------- |
| `badge`    | `badge`    | Show a badge on top of the icon     | `string`                            | `undefined` |
| `disabled` | `disabled` | Disable the button                  | `boolean`                           | `false`     |
| `ghost`    | `ghost`    | Ghost variant of the button         | `boolean`                           | `false`     |
| `inverted` | `inverted` | Inverted color for dark backgrounds | `boolean`                           | `false`     |
| `outlined` | `outlined` | Outlined variant of the button      | `boolean`                           | `false`     |
| `path`     | `path`     | Path for the svg icon               | `string`                            | `null`      |
| `size`     | `size`     | Size of the button                  | `"default" \| "small" \| "x-small"` | `'default'` |
| `text`     | `text`     | Text variant of the button          | `boolean`                           | `false`     |


## Slots

| Slot             | Description               |
| ---------------- | ------------------------- |
| `"Default slot"` | Default slot for the icon |


## Dependencies

### Used by

 - [c-card](../c-card)
 - [c-data-table](../c-data-table)
 - [c-pagination](../c-pagination)
 - [c-side-navigation](../c-side-navigation)
 - [c-swiper](../c-swiper)
 - [c-tag](../c-tag)

### Depends on

- [c-badge](../c-badge)
- [c-ripple](../c-ripple)

### Graph
```mermaid
graph TD;
  c-icon-button --> c-badge
  c-icon-button --> c-ripple
  c-card --> c-icon-button
  c-data-table --> c-icon-button
  c-pagination --> c-icon-button
  c-side-navigation --> c-icon-button
  c-swiper --> c-icon-button
  c-tag --> c-icon-button
  style c-icon-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
