isIP
=====
[![NPM version](https://badge.fury.io/js/isip.svg)](http://badge.fury.io/js/isipaddress)
[![Build Status](https://travis-ci.org/DavidTPate/isip.svg?branch=master)](https://travis-ci.org/DavidTPate/isip)
[![Coverage Status](https://img.shields.io/coveralls/DavidTPate/isip.svg?branch=master)](https://coveralls.io/r/DavidTPate/isip)

Pure Javascript implementation for truly checking if the provided input is an IP address. Based on [RFC 791 (IPv4)](http://tools.ietf.org/html/rfc791), [RFC 4291 (IPv6)](http://tools.ietf.org/html/rfc4291), and [RFC 4632 (CIDR)](http://tools.ietf.org/html/rfc4632).

## Install

#### NPM
```bash
$ npm install isipaddress
```

## Node.js
```js
var isIP = require('isipaddress');

isIP.test('127.0.0.1'); // returns true
isIP.test('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210/16'); // returns true
isIP.test('Bananas in pajamas are coming down the stairs'); // returns false

isIP.v4('127.0.0.1'); // returns true
isIP.v4('127.0.0.1/18'); // returns true
isIP.v4('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210'); // returns false

isIP.v6('127.0.0.1'); // returns false
isIP.v6('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210'); // returns true
isIP.v6('FEDC:BA98:7654:3210:FEDC:BA98:7654:3210/32'); // returns true
```

## License

  [MIT](LICENSE)