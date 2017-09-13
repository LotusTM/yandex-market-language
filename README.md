Yandex Market Language (YML)
============================

> Your own Yandex Market Language (YML) generator from JSON, with blackjack and validation

> Твой собственный генератор Yandex Market Language (YML) из JSON, с блэкджэком и валидацией

<a href='https://www.npmjs.com/package/yandex-market-language'>
  <img src='https://img.shields.io/npm/v/yandex-market-language.svg' alt='NPM version' />
</a>
<a href='https://travis-ci.org/LotusTM/yandex-market-language'>
  <img src='https://img.shields.io/travis/LotusTM/yandex-market-language.svg?label=travis' alt='Travis Build Status' />
</a>
<a href='https://greenkeeper.io'>
  <img src='https://badges.greenkeeper.io/LotusTM/yandex-market-language.svg' alt='Greenkeeper Status' />
</a>
<a href='https://david-dm.org/LotusTM/yandex-market-language'>
  <img src='https://img.shields.io/david/LotusTM/yandex-market-language.svg' alt='Dependency Status' />
</a>
<a href='https://david-dm.org/LotusTM/yandex-market-language?type=dev'>
  <img src='https://img.shields.io/david/dev/LotusTM/yandex-market-language.svg' alt='DevDependency Status' />
</a>

## How to use

Install with NPM

```shell
npm install yandex-market-language
```

Validate input

```js
const yml = require('yandex-market-language')

const YML = yml({
  name: 'BestSeller',
  ...  
})
```

Create XML 

```js
YML.create()
```

Print to string

```JS
YML.end({ pretty: true })
```

Finally, write to file

```js
const { writeFile } = require('fs')

writeFile('yandex-market.yml', YML, (err) => {
  if (err) throw err
  console.log('YML has been saved!')
})
```

## API

### `yml(input: object, options?: object)`

Accepts input and validates it

* `input: object` — JSON which will be validated and used to generate YML.

  Object has to be fully formed before passing to `yml` and confront [schema](https://github.com/LotusTM/yandex-market-language/blob/master/lib/schemas.js) format, otherwise it will throw validation error.

  Examples of possible valid inputs can be seen [here](https://github.com/LotusTM/yandex-market-language/blob/master/tests/fixtures/inputs.js).

  If for some strange reason you need to generate wrong YML bypassing the validation, use `options.validate: false`.

* `options?: object` — Lib options

  * `options.validate?: boolean` — validate or not input. By default `true`. You do not want to set it to `false`.
  * `options.date?: string` — fixed date for YML `date` attribute, which should represent time of YML update. If not defined, will fallback to current date. Should be in RFC2822 or ISO format.

Returns library methods `create` and `end`

```js
const yml = require('yandex-market-language')
const YML = yml({...VALID_INPUT...})
```

### `yml(...).create()`

Creates from JSON XML object with all necessary nodes formed and in place.

Returns [xmlbuilder](https://github.com/oozcitak/xmlbuilder-js) `XMLElement`. Since it is `xmlbuilder` entity, all builder's [methods](https://github.com/oozcitak/xmlbuilder-js/wiki#creating-child-nodes) can be used on it. But nobody will ever use them...

```js
const yml = require('yandex-market-language')
const YML = yml({...VALID_INPUT...}).create()
// => XMLElement { ... }
```

### `yml(...).end(options?: object)`

Creates XML object and immediately prints it as a final YML in form of the string.

* `options?: object` — Any options you'd normally pass to `xmlbuilder` [`end()`](https://github.com/oozcitak/xmlbuilder-js/wiki#converting-to-string) method.

```js
const yml = require('yandex-market-language')
const YML = yml({...VALID_INPUT...}).end({ pretty: true })
// => <yml_catalog date="2017-09-07 00:00">...</yml_catalog>
```

## FAQ

### Is it production ready?

Yeap

### Why so little methods? So stupid!

That lib is small thing doing big work. It doesn't need to be more complicated than that. Also, it has feeling too, ya know...

### Is validation full?

Built-in validation closely replicates Yandex specs and should be in sync.

As for now, it has some unfinished parts. Just search code for `@todo` to see them all.

It supports only two types of offers: Simplified and Free. Other types are rarely used, but still planned for some distant and dark future.

Finally, some things can be validated only by Yandex or too specific to write a programmable validation. Nothing can be done about it, sorry world.

### I've found discrepancy with Yandex specs!

We are very sorry (no, we are not). Let us know in [issues](https://github.com/LotusTM/yandex-market-language/issues). 

### Oh my, it doesn't write to file! Can I have a method for it?

Nope. Just use Node's `fs.writeFile` method (see example above). If you can not use that method, most likely you are in environment, where writing files is a futile attempt.

## License

Copyright 2014 LotusTM. Licensed under the [Apache 2.0 license](https://github.com/LotusTM/Kotsu/blob/master/LICENSE.md).