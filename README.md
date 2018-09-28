# is-element-user-visible
Function, that check if the element is visible for user.

It checks for a next conditions:
* Element is in viewport;
* Element (or it's parents) is visible by styles values (display, visibility, opacity);
* Element is visible within the scrollable container.

## Install
```
npm install is-element-user-visible
```

## Usage
```javascript

var isElementUserVisible = require('is-element-user-visible');
var element = document.getElementById('example');

// basic usage
console.log(isElementUserVisible(element)); 

// at least 80 percent of element is visible (default: 100)
console.log(isElementUserVisible(element), 80);
```

## Tests
Coming soon