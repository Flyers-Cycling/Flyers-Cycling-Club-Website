import { describe, expect, it } from 'vitest';
import { isExternalUrl, withBase } from '../../src/lib/urls';

describe('withBase', () => {
  it('resolves root base paths cleanly', () => {
    expect(withBase('/', '/')).toBe('/');
    expect(withBase('/programs/xc', '/')).toBe('/programs/xc');
    expect(withBase('sponsors', '/')).toBe('/sponsors');
  });

  it('resolves GitHub Pages project subpath cleanly', () => {
    expect(withBase('/', '/flyers/')).toBe('/flyers/');
    expect(withBase('/programs/enduro', '/flyers/')).toBe('/flyers/programs/enduro');
    expect(withBase('/images/hero-trail.svg', '/flyers')).toBe('/flyers/images/hero-trail.svg');
  });

  it('leaves external URLs, mailto, and hash anchors untouched', () => {
    expect(withBase('https://www.zeffy.com/', '/flyers/')).toBe('https://www.zeffy.com/');
    expect(withBase('mailto:info@lakemountainflyers.com', '/flyers/')).toBe(
      'mailto:info@lakemountainflyers.com',
    );
    expect(withBase('#pathway-finder', '/flyers/')).toBe('#pathway-finder');
  });
});

describe('isExternalUrl', () => {
  it('treats http and https links as external and site paths as internal', () => {
    expect(isExternalUrl('https://www.zeffy.com/')).toBe(true);
    expect(isExternalUrl('http://example.org')).toBe(true);
    expect(isExternalUrl('/winter-camp')).toBe(false);
  });
});
