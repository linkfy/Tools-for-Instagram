declare namespace urlRegex {
	interface Options {
		/**
		Only match an exact string. Useful with `RegExp#test` to check if a string is a URL.

		@default false
		*/
		readonly exact?: boolean;

		/**
		Force URLs to start with a valid protocol or `www`. If set to `false` it'll match the TLD against a list of valid [TLDs](https://github.com/stephenmathieson/node-tlds).

		@default true
		*/
		readonly strict?: boolean;
	}
}

/**
Regular expression for matching URLs.

@example
```
import urlRegex = require('url-regex');

urlRegex().test('http://github.com foo bar');
//=> true

urlRegex().test('www.github.com foo bar');
//=> true

urlRegex({exact: true}).test('http://github.com foo bar');
//=> false

urlRegex({exact: true}).test('http://github.com');
//=> true

urlRegex({strict: false}).test('github.com foo bar');
//=> true

urlRegex({exact: true, strict: false}).test('github.com');
//=> true

'foo http://github.com bar //google.com'.match(urlRegex());
//=> ['http://github.com', '//google.com']
```
*/
declare function urlRegex(options?: urlRegex.Options): RegExp;

export = urlRegex;
