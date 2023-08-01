// 1. command {{param1}} {{param2}} .. {{paramN}} (normal param)
// separate params by space
// make dictionary of param name and typed value
// replace each param in rule url with typed value for that param

// 2. command {{dataset1}} {{dataset2}} .. {{datasetN}} (multiple dataset params)
// separate params by space
// make dictionary of param name and closest matching entry in dataset for that param
// replace each param in rule url with found dataset entry for that param

// 3. command {{dataset1.name}} {{dataset2.name}} .. {{datasetN.name}} (multiple dataset params with accessor)
// separate params by space
// make dictionary of param name anc closest matching entry in dataset for that param
// replace each param in rule url with found dataset entry for that param

```js
const simpleParam = {
    param: "{{param}}",
    type: 'simple',
    substituteValue: 'typed value',
}
const datasetParam = {
    param: "{{dataset}}",
    type: 'dataset',
    substituteValue: 'closest dataset value to typed value',
}
const datasetParamWithAccessor = {
    param: "{{dataset}}",
    type: 'dataset',
    substituteValue: {
        field1: 'field1 value',
        field2: 'field2 value',
    },
}
```