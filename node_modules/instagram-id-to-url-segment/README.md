# Instagram Id To URL Segment
[![Build Status](http://img.shields.io/travis/slang800/instagram-id-to-url-segment.svg?style=flat-square)](https://travis-ci.org/slang800/instagram-id-to-url-segment) [![NPM version](http://img.shields.io/npm/v/instagram-id-to-url-segment.svg?style=flat-square)](https://www.npmjs.org/package/instagram-id-to-url-segment) [![NPM license](http://img.shields.io/npm/l/instagram-id-to-url-segment.svg?style=flat-square)](https://www.npmjs.org/package/instagram-id-to-url-segment)

Instagram has 2 types of IDs that they use for their posts. One is used in the URLs (it looks like `5n7dDmhTr3`) and the other is used internally in their undocumented API (it looks like `1038059720608660215`).

I didn't think that they would maintain 2 unrelated IDs for each post, just for the purpose of a shorter URL, so I [investigated whether or not they were related](http://carrot.is/coding/instagram-ids). It turns out you can convert between them pretty easily (especially in languages where we don't represent integers as floats - like Python).

## Usage
Note: the id must be passed in as a string. If it was passed as a number then it would be severely rounded.

### CoffeeScript

```coffee
{instagramIdToUrlSegment, urlSegmentToInstagramId} = require 'instagram-id-to-url-segment'
console.log(instagramIdToUrlSegment('1038059720608660215')) # 5n7dDmhTr3
console.log(urlSegmentToInstagramId('5n7dDmhTr3')) # 1038059720608660215
```

### JavaScript

```js
var ref, urlSegmentToInstagramId, instagramIdToUrlSegment;
ref = require('instagram-id-to-url-segment')
instagramIdToUrlSegment = ref.instagramIdToUrlSegment
urlSegmentToInstagramId = ref.urlSegmentToInstagramId;

console.log(instagramIdToUrlSegment('1038059720608660215')); // 5n7dDmhTr3
console.log(urlSegmentToInstagramId('5n7dDmhTr3')); // 1038059720608660215
```
