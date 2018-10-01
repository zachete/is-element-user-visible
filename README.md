# is-element-user-visible
Function, that check if the element is visible for user.

It checks for a next conditions:
* Element is in viewport;
* Element (or it's parents) is visible by styles values (display, visibility, opacity);
* Element is visible within scrollable or hidden container.

## Install
```
npm install is-element-user-visible
```

## Usage
```javascript

var isElementUserVisible = require('is-element-user-visible');
var element = document.getElementById('example');

var config = {
    element: element,
    parent: element.parentNode,
    percentage: 50
};

console.log(isElementUserVisible(config));
```

## Config
Coming soon

## Tests
Coming soon