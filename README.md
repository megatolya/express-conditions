# express-conditions

Helper for creating conditional middlewares in express.

## Installation
```
npm install --save express-conditions
```


## Examples
```js
const express = require('express');
const {query, session} = require('express-conditions');

const app = express();

app.get('/photo/:id', query({comments: 'show'}, (req, res, next) => {
    res.render('photo-with-comments', ...);
}));

app.get('/me', session({auth: true}, (req, res, next) => {
    res.render('personal-page');
}));
```

## API

`express-conditions` exports 6 comparators, all with the same api:
* req
* query (req.query)
* headers (req.headers)
* cookies (req.cookies)
* session (req.session)
* params (req.params)

Passing `true` to value will only check if property is in the target obj. Example:
```js
query({size: true}, handler) // /page?size=0 valid
query({size: true}, handler) // /page?size valid
query({size: true}, handler) // /page?size=123 valid

query({size: true}, handler) // /page?sized=123 not valid
```

Passing `false` to value will only check if property is *not* in the target obj. Example:
```js
query({size: false}, handler) // /page?sized valid
query({size: false}, handler) // /page valid

query({size: false}, handler) // /page?size not valid
```

Passing something else will try to compare it with target object value. Example:
```js
query({size: 'big'}, handler) // /page?size=big valid
query({size: undefined}, handler) // /page valid
query({size: 123}, handler) // /page?size=123 valid

query({size: 'small'}, handler) // /page?size=big invalid
```

You can build your own comparator:

```js
const {createCondition} = require('express-conditions');
const auth = createCondition('auth');

app.get('/admin', auth({role: 'admin'}, (req, res, next) => res.render('admin')));
```
