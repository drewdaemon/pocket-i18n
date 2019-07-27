import assert from 'assert';
import Pocket from '../src/index';

describe('Translating', function () {
  it('looks up nested translations', function () {
    const copyrightStr = 'Copyright 2019';
    const translations = {
      homePage: {
        footer: {
          copyright: copyrightStr
        }
      }
    };

    const i18n = Pocket.load(translations);
    assert.equal(i18n.t('homePage.footer.copyright'), copyrightStr);
  });

  it('throws an error if translation doesn\'t exist', function () {
    let translations = {
      homePage: {
        footer: {
        }
      }
    };

    let i18n = Pocket.load(translations);
    assert.throws(function () { i18n.t('homePage.footer.copyright') });

    translations = {
      homePage: {}
    };

    i18n = Pocket.load(translations);
    assert.throws(function () { i18n.t('homePage.footer.copyright') });
  });

  it('correctly interpolates values', function () {
    const translations = {
      homePage: {
        footer: {
          copyright: 'Copyright {companyName} 2019'
        }
      }
    };

    const i18n = Pocket.load(translations);
    const interpolated = i18n.t('homePage.footer.copyright', {companyName: 'My Company'});
    assert.equal(interpolated, 'Copyright My Company 2019')
  });
});
