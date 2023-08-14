# c-radio



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute      | Description                                                  | Type                                  | Default            |
| ------------- | -------------- | ------------------------------------------------------------ | ------------------------------------- | ------------------ |
| `color`       | `color`        | Color of the radio group                                     | `string`                              | `''`               |
| `disabled`    | `disabled`     | Disable the radio group                                      | `boolean`                             | `false`            |
| `hideDetails` | `hide-details` | Hide the hint and error messages                             | `boolean`                             | `false`            |
| `hint`        | `hint`         | Hint text for the input                                      | `string`                              | `''`               |
| `inline`      | `inline`       | Display radio buttons inline                                 | `boolean`                             | `false`            |
| `items`       | --             | Radio group items                                            | `CRadioGroupItem[]`                   | `[]`               |
| `label`       | `label`        | Label of the radio group                                     | `string`                              | `undefined`        |
| `required`    | `required`     | Set as required                                              | `boolean`                             | `false`            |
| `returnValue` | `return-value` | Return only the item value rather than the whole item object | `boolean`                             | `undefined`        |
| `valid`       | `valid`        | Set the validity of the input                                | `boolean`                             | `true`             |
| `validation`  | `validation`   | Custom validation message                                    | `string`                              | `'Required field'` |
| `value`       | `value`        | Value of the radio group                                     | `CRadioGroupItem \| number \| string` | `undefined`        |


## Events

| Event         | Description                     | Type               |
| ------------- | ------------------------------- | ------------------ |
| `changeValue` | Emit value change to the parent | `CustomEvent<any>` |


## Slots

| Slot | Description                |
| ---- | -------------------------- |
|      | Default slot for the label |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
