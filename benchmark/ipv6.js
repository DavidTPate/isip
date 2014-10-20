var Benchmark = require('benchmark'),
    benchmarks = require('beautify-benchmark'),
    isIP = require('..'),
    suite = new Benchmark.Suite,
    testIp = 'FEDC:BA98:7654:3210:FEDC:BA98:7654:3210/32';

suite.add({
    name: 'isIP#test(ipv6)',
    minSamples: 100,
    fn: function () {
        isIP.test(testIp);
    }
}).add({
    name: 'isIP#v6(ipv6)',
    minSamples: 100,
    fn: function () {
        isIP.v6(testIp);
    }
}).on('start', function onCycle() {
    process.stdout.write('  Testing IP "' + testIp + '"\n\n')
}).on('cycle', function onCycle(event) {
    benchmarks.add(event.target);
}).on('complete', function onComplete() {
    benchmarks.log();
}).run();