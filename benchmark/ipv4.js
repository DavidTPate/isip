var Benchmark = require('benchmark'),
    benchmarks = require('beautify-benchmark'),
    isIP = require('..'),
    suite = new Benchmark.Suite,
    testIp = '192.168.2.1/24';

suite.add({
    name: 'isIP#test(ipv4)',
    minSamples: 100,
    fn: function () {
        isIP.test(testIp);
    }
}).add({
    name: 'isIP#v4(ipv4)',
    minSamples: 100,
    fn: function () {
        isIP.v4(testIp);
    }
}).on('start', function onCycle() {
    process.stdout.write('  Testing IP "' + testIp + '"\n\n')
}).on('cycle', function onCycle(event) {
    benchmarks.add(event.target);
}).on('complete', function onComplete() {
    benchmarks.log();
}).run();