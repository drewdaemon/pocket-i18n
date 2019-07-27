const Pocket = {
  load: function (translations) {
    if (typeof translations !== 'object') throw TypeError('pocket-i18n - load - must pass an object. If you want to load from a URL, use loadFromUrl');

    return this.i18n(translations);
  },

  loadFromUrl: function (url, callback) {
    if (typeof url !== 'string') throw TypeError('pocket-i18n - loadFromUrl - url must be a string');
    if (typeof callback !== 'function') throw TypeError('pocket-i18n - loadFromUrl - callback must be a function');

    const self = this;
    const request = new XMLHttpRequest();
    request.open('GET', url);

    request.onload = function () {
      const translations = JSON.parse(request.responseText);
      callback(self.i18n(translations));
    };

    request.onerror = function () {
      throw Error('Couldn\'t load translation from ' + url);
    };

    request.send();
  },

  i18n: function (translations) {
    return {
      translations: translations,
      interpolate: function(template, fillers) {
        let ret = template;
        const keys = Object.keys(fillers);
        for (let i = 0; i < keys.length; i++) {
            ret = ret.replace(`{${keys[i]}}`, fillers[keys[i]]);
        }
        return ret;
      },
      t: function (lookupStr, fillers) {
        const lookupKeys = lookupStr.split('.');
        let translation = this.translations;

        for (let i = 0; i < lookupKeys.length; i++) {
          if (!translation[lookupKeys[i]]) break;
          translation = translation[lookupKeys[i]];
        }

        if (!translation || typeof translation === 'object') {
          throw new Error ('pocket-i18n - Translation ' + lookupStr + 'doesn\'t exist');
        }

        if (!fillers) {
          return translation;
        } else {
          return this.interpolate(translation, fillers);
        }
      }
    };
  }
};

module.exports = Pocket;
