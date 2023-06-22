# c-text-field



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute          | Description                                                                                      | Type      | Default            |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------ | --------- | ------------------ |
| `autocapitalize` | `autocapitalize`   | HTML input autocapitalize                                                                        | `string`  | `''`               |
| `autocomplete`   | `autocomplete`     | HTML input autocomplete                                                                          | `string`  | `''`               |
| `autocorrect`    | `autocorrect`      | HTML input autocorrect                                                                           | `string`  | `''`               |
| `autofocus`      | `autofocus`        | Auto focus the input                                                                             | `boolean` | `false`            |
| `disabled`       | `disabled`         | Disable the input                                                                                | `boolean` | `false`            |
| `hideDetails`    | `hide-details`     | Hide the hint and error messages                                                                 | `boolean` | `false`            |
| `hint`           | `hint`             | Hint text for the input                                                                          | `string`  | `''`               |
| `hostId`         | `id`               | Id of the input                                                                                  | `string`  | `undefined`        |
| `label`          | `label`            | Label of the input                                                                               | `string`  | `undefined`        |
| `max`            | `max`              | Maximum value on a numeric input                                                                 | `number`  | `null`             |
| `min`            | `min`              | Minimum value on a numeric input                                                                 | `number`  | `null`             |
| `name`           | `name`             | Name of the input                                                                                | `string`  | `undefined`        |
| `number`         | `number`           | <span style="color:red">**[DEPRECATED]**</span> Use type="number" instead<br/><br/>Numeric input | `boolean` | `false`            |
| `placeholder`    | `placeholder`      | Placeholder of the input                                                                         | `string`  | `undefined`        |
| `readonly`       | `readonly`         | Mark as readonly                                                                                 | `boolean` | `false`            |
| `required`       | `required`         | Set the input as required                                                                        | `boolean` | `false`            |
| `rows`           | `rows`             | Rows on the input                                                                                | `number`  | `1`                |
| `shadow`         | `shadow`           | Shadow variant of the input                                                                      | `boolean` | `false`            |
| `step`           | `step`             | Step size on a numeric input                                                                     | `number`  | `null`             |
| `trimWhitespace` | `trim-whitespace`  | Trim whitespace from the return value                                                            | `boolean` | `false`            |
| `type`           | `type`             | Type of the input                                                                                | `string`  | `undefined`        |
| `valid`          | `valid`            | Set the validity of the input                                                                    | `boolean` | `true`             |
| `validate`       | `validate`         | Manual validation                                                                                | `boolean` | `false`            |
| `validateOnBlur` | `validate-on-blur` | Validate the input on blur                                                                       | `boolean` | `false`            |
| `validation`     | `validation`       | Custom validation message                                                                        | `string`  | `'Required field'` |
| `value`          | `value`            | Value of the input                                                                               | `string`  | `undefined`        |


## Events

| Event         | Description                | Type               |
| ------------- | -------------------------- | ------------------ |
| `changeValue` | Emit changes to the parent | `CustomEvent<any>` |


## Dependencies

### Depends on

- [c-input](../c-input)

### Graph
```mermaid
graph TD;
  c-text-field --> c-input
  style c-text-field fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
