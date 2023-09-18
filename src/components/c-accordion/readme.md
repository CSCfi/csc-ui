# c-accordion



<!-- Auto Generated Below -->


## Properties

| Property             | Attribute   | Description                           | Type                                       | Default     |
| -------------------- | ----------- | ------------------------------------- | ------------------------------------------ | ----------- |
| `mandatory`          | `mandatory` | Disallow collapsing all the items     | `boolean`                                  | `false`     |
| `multiple`           | `multiple`  | Allow expanding multiple items        | `boolean`                                  | `false`     |
| `outlined`           | `outlined`  | Show an outline around expanded items | `boolean`                                  | `false`     |
| `value` _(required)_ | `value`     | Value of the accordion                | `(string \| number)[] \| number \| string` | `undefined` |


## Events

| Event         | Description                | Type                            |
| ------------- | -------------------------- | ------------------------------- |
| `changeValue` | Emit changes to the parent | `CustomEvent<number \| string>` |


## Slots

| Slot             | Description                                      |
| ---------------- | ------------------------------------------------ |
| `"Default slot"` | Default slot for the c-accordion-item components |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
