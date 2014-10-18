(function (should, lib) {
    describe('isip', function () {
        describe('interface', function() {
            it('should be instantiated', function () {
                lib.should.be.ok;
            });
            it('should have the test function', function () {
                lib.test.should.be.a.function;
            });
            it('should have the v4 function', function () {
                lib.v4.should.be.a.function;
            });
            it('should have the v6 function', function () {
                lib.v6.should.be.a.function;
            });
            it('should have the future function', function () {
                lib.future.should.be.a.function;
            });
        });

        describe('#test', function() {
            var validIPs = [
                    '2001:db8::7',
                    '192.0.2.16/30',
                    'v1.09azAZ-._~!$&\'()*+,;=:',
                    'a:b:c:d:e::1.2.3.4',
                    'FEDC:BA98:7654:3210:FEDC:BA98:7654:3210',
                    '1080:0:0:0:8:800:200C:417A',
                    '127.0.0.1'
                ],
                invalidIPs = [
                    '192.0.2.16:80/30',
                    '192.0.2.16a',
                    'qwerty',
                    '127.0.0.1:8000'
                ];

            describe('Validity Tests', function () {
                validIPs.forEach(function (ip) {
                    it('should consider ' + ip + ' valid', function () {
                        lib.test(ip).should.be.true;
                    });
                });
            });

            describe('Invalidity Tests', function () {
                invalidIPs.forEach(function (ip) {
                    it('should consider ' + ip + ' invalid', function () {
                        lib.test(ip).should.be.false;
                    });
                });
            });
        });

        describe('#v4', function() {
            var validIPv4s = [
                    '192.0.2.16/30',
                    '127.0.0.1'
                ],
                invalidIPv4s = [
                    '2001:db8::7',
                    'FEDC:BA98:7654:3210:FEDC:BA98:7654:3210',
                    '1080:0:0:0:8:800:200C:417A',
                    'v1.09azAZ-._~!$&\'()*+,;=:',
                    'a:b:c:d:e::1.2.3.4',
                    '192.0.2.16a',
                    'qwerty',
                    '127.0.0.1:8000'
                ];

            describe('Validity Tests', function () {
                validIPv4s.forEach(function (ip) {
                    it('should consider ' + ip + ' valid', function () {
                        lib.v4(ip).should.be.true;
                    });
                });
            });

            describe('Invalidity Tests', function () {
                invalidIPv4s.forEach(function (ip) {
                    it('should consider ' + ip + ' invalid', function () {
                        lib.v4(ip).should.be.false;
                    });
                });
            });
        });

        describe('#v6', function() {
            var validIPv6s = [
                    '2001:db8::7',
                    'a:b:c:d:e::1.2.3.4',
                    'FEDC:BA98:7654:3210:FEDC:BA98:7654:3210',
                    '1080:0:0:0:8:800:200C:417A'
                ],
                invalidIPv6s = [
                    'v1.09azAZ-._~!$&\'()*+,;=:',
                    '192.0.2.16/30',
                    '192.0.2.16:80/30',
                    '192.0.2.16a',
                    'qwerty',
                    '127.0.0.1:8000',
                    '127.0.0.1'
                ];

            describe('Validity Tests', function () {
                validIPv6s.forEach(function (ip) {
                    it('should consider ' + ip + ' valid', function () {
                        lib.v6(ip).should.be.true;
                    });
                });
            });

            describe('Invalidity Tests', function () {
                invalidIPv6s.forEach(function (ip) {
                    it('should consider ' + ip + ' invalid', function () {
                        lib.v6(ip).should.be.false;
                    });
                });
            });
        });

        describe('#future', function() {
            var validIPFutures = [
                    'v1.09azAZ-._~!$&\'()*+,;=:'
                ],
                invalidIPFutures = [
                    '2001:db8::7',
                    '192.0.2.16/30',
                    '192.0.2.16:80/30',
                    '192.0.2.16a',
                    'qwerty',
                    '127.0.0.1:8000',
                    'a:b:c:d:e::1.2.3.4',
                    'FEDC:BA98:7654:3210:FEDC:BA98:7654:3210',
                    '1080:0:0:0:8:800:200C:417A',
                    '127.0.0.1'
                ];

            describe('Validity Tests', function () {
                validIPFutures.forEach(function (ip) {
                    it('should consider ' + ip + ' valid', function () {
                        lib.future(ip).should.be.true;
                    });
                });
            });

            describe('Invalidity Tests', function () {
                invalidIPFutures.forEach(function (ip) {
                    it('should consider ' + ip + ' invalid', function () {
                        lib.future(ip).should.be.false;
                    });
                });
            });
        });

    });
}(require('should'), require('../')));