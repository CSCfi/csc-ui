# c-menu



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute | Description                                                                        | Type                 | Default     |
| --------------- | --------- | ---------------------------------------------------------------------------------- | -------------------- | ----------- |
| `customTrigger` | --        | Programmatic trigger component                                                     | `CMenuCustomTrigger` | `undefined` |
| `items`         | --        | Menu items                                                                         | `CMenuItem[]`        | `[]`        |
| `nohover`       | `nohover` | No hover background                                                                | `boolean`            | `false`     |
| `simple`        | `simple`  | Simple variant without chevron and background, E.g. when a button is the activator | `boolean`            | `false`     |
| `small`         | `small`   | Small variant                                                                      | `boolean`            | `false`     |


## Slots

| Slot | Description                                     |
| ---- | ----------------------------------------------- |
|      | Menu title / activator element (simple variant) |


## Dependencies

### Used by

 - [c-pagination](../c-pagination)

### Graph
```mermaid
graph TD;
  c-pagination --> c-menu
  style c-menu fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
