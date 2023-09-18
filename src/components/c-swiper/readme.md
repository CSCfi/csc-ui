# c-tab-buttons



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description         | Type               | Default     |
| -------- | --------- | ------------------- | ------------------ | ----------- |
| `value`  | `value`   | Value of the swiper | `number \| string` | `undefined` |


## Events

| Event         | Description                     | Type                            |
| ------------- | ------------------------------- | ------------------------------- |
| `changeValue` | Emit value change to the parent | `CustomEvent<number \| string>` |


## Slots

| Slot             | Description                                |
| ---------------- | ------------------------------------------ |
| `"Default slot"` | Default slot for the c-swiper-tab elements |


## Dependencies

### Depends on

- [c-icon-button](../c-icon-button)

### Graph
```mermaid
graph TD;
  c-swiper --> c-icon-button
  c-icon-button --> c-ripple
  style c-swiper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
