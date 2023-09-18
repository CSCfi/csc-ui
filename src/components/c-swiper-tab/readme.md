# c-tab

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description         | Type               | Default     |
| ---------- | ---------- | ------------------- | ------------------ | ----------- |
| `active`   | `active`   | Mark as active      | `boolean`          | `false`     |
| `disabled` | `disabled` | Disable button      | `boolean`          | `false`     |
| `hostId`   | `id`       | Id of the button    | `string`           | `undefined` |
| `label`    | `label`    | Label of the button | `string`           | `undefined` |
| `position` | `position` | Position in the set | `number`           | `undefined` |
| `setsize`  | `setsize`  | Size of the set     | `number`           | `undefined` |
| `value`    | `value`    | Value of the button | `number \| string` | `undefined` |


## Events

| Event         | Description                     | Type                            |
| ------------- | ------------------------------- | ------------------------------- |
| `changeValue` | Emit value change to the parent | `CustomEvent<number \| string>` |


## Dependencies

### Depends on

- [c-ripple](../c-ripple)

### Graph
```mermaid
graph TD;
  c-swiper-tab --> c-ripple
  style c-swiper-tab fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
