isIP
=====
[![NPM version](https://badge.fury.io/js/isip.svg)](http://badge.fury.io/js/isipaddress)
[![Build Status](https://travis-ci.org/DavidTPate/isip.svg?branch=master)](https://travis-ci.org/DavidTPate/isip)
[![Code Climate](https://codeclimate.com/github/DavidTPate/isip/badges/gpa.svg)](https://codeclimate.com/github/DavidTPate/isip)
[![Test Coverage](https://codeclimate.com/github/DavidTPate/isip/badges/coverage.svg)](https://codeclimate.com/github/DavidTPate/isip)

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

## Benchmarks
```bash
> Benchmarking ipv4.js

  Testing IP "192.168.2.1/24"

  isIP#test(ipv4) x 2,355,657 ops/sec ±0.25% (196 runs sampled)
  isIP#v4(ipv4)   x 8,430,772 ops/sec ±0.40% (194 runs sampled)

> Benchmarking ipv6.js

  Testing IP "FEDC:BA98:7654:3210:FEDC:BA98:7654:3210/32"

  isIP#test(ipv6) x 1,461,847 ops/sec ±0.22% (196 runs sampled)
  isIP#v6(ipv6)   x 1,488,787 ops/sec ±0.17% (196 runs sampled)

> Benchmarking ipvFuture.js

  Testing IP "v1.09azAZ-._~!$&'()*+,;=:"

  isIP#test(ipvFuture)   x  1,872,592 ops/sec ±0.29% (195 runs sampled)
  isIP#future(ipvFuture) x 10,964,118 ops/sec ±0.50% (191 runs sampled)
```

## License

  [MIT](LICENSE)
