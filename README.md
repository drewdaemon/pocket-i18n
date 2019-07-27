# Pocket i18n

Pocket is a **blazing fast** internationalization library that can fit in your pocket **(< 1KB)**

:white_check_mark: Supports lightning-fast translated string lookups (allows nesting!)

:white_check_mark: Features string template interpolation

:white_check_mark: Is compatible with ALL browsers (yes, even IE 11)

:white_check_mark: Can load translation files from URL

:white_check_mark: Has absolutely no dependencies

## Getting started
```bash
npm i pocket-i18n
```

### Load translations from object
```js
import Pocket from 'pocket-i18n';

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

### Load translations from URL
```js
import Pocket from 'pocket-i18n';

const intl = Pocket.load('translations/norwegian.json', function (intl) {
    intl.t('homePage.footer.copyright', {companyName: 'My Company'});
    // Opphavsrett My Company 2019
});
```

### With async/await and promises (need polyfill for IE)
```js
import Pocket from 'pocket-i18n';

const intl = await new Promise(resolve => Pocket.load('translations/spanish.json', resolve));
intl.t('homePage.footer.copyright', {companyName: 'My Company'});
// Derechos de autor My Company 2019
```
