[![Build Status](https://travis-ci.com/drewctate/pocket-i18n.svg?branch=master)](https://travis-ci.com/drewctate/pocket-i18n)

# Pocket i18n

Pocket is a **blazing fast** internationalization library that can fit in your pocket **(< 1KB)**

:white_check_mark: Fast translated string lookups (allows nesting!)

:white_check_mark: String template interpolation

:white_check_mark: Compatible with ALL browsers (yes, even IE 11)

:white_check_mark: Can load translation files from URL

:white_check_mark: Absolutely no dependencies

## Getting started
```bash
npm i pocket-i18n
```

### Import Pocket
You can use ES6 imports or (CommonJS `require`).
```js
import Pocket from 'pocket-i18n';
```

Or, just use a script tag:
```html
<script src="node_modules/pocket-i18n/pocket-i18n.js"></script>
```

### Load translations
Both `Pocket.load` and `Pocket.loadFromUrl` return an `intl` object with a `t` method for translation lookups.

#### From an object
```js
const translations = {
    homePage: {
        footer: {
            copyright: 'Copyright {companyName} 2019'
        }
    }
};

const intl = Pocket.load(translations);

intl.t('homePage.footer.copyright', {companyName: 'My Company'});
// Copyright My Company 2019
```

#### From URL
```js
const intl = Pocket.loadFromUrl('translations/norwegian.json', function (intl) {
    intl.t('homePage.footer.copyright', {companyName: 'My Company'});
    // Opphavsrett My Company 2019
});
```

#### With async/await and promises (need polyfill for IE)
```js
const intl = await new Promise(resolve => Pocket.loadFromUrl('translations/spanish.json', resolve));
intl.t('homePage.footer.copyright', {companyName: 'My Company'});
// Derechos de autor My Company 2019
```

### Using `t(lookupStr: string, fillers?: Object)`

#### `lookupStr`
The translation lookup. Let's say translations object looks like this:
```js
{
    homePage: {
        footer: {
            copyright: 'Copyright My Company 2019'
        }
    }
}
```
To look up the copyright translation, we would pass `'homePage.footer.copyright'`.

#### fillers (optional)
The set of interpolation values. Let's say translations object looks like this:
```js
{
    homePage: {
        footer: {
            copyright: 'Copyright {companyName} 2019'
        }
    }
}
```
We would pass the fillers object to `t` like so:
```js
intl.t('homePage.footer.copyright', {companyName: 'My company'});
```

### Advanced example
```js
const translations = {
    homePage: {
        footer: {
            copyright: 'Copyright {companyName} 2019',
            companyName: 'Translated Company Name'
        }
    }
};

const intl = Pocket.load(translations);

intl.t('homePage.footer.copyright', {companyName: intl.t('homePage.footer.companyName')});
// Copyright Translated Company Name 2019
```
