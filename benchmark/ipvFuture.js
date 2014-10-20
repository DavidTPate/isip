var Benchmark = require('benchmark'),
    benchmarks = require('beautify-benchmark'),
    isIP = require('..'),
    suite = new Benchmark.Suite,
    testIp = 'v1.09azAZ-._~!$&\'()*+,;=:';

suite.add({
    name: 'isIP#test(ipvFuture)',
    minSamples: 100,
    fn: function () {
        isIP.test(testIp);
    }
}).add({
    name: 'isIP#future(ipvFuture)',
    minSamples: 100,
    fn: function () {
        isIP.future(testIp);
    }
}).on('start', function onCycle() {
    process.stdout.write('  Testing IP ' + testIp + '\n\n')
}).on('cycle', function onCycle(event) {
    benchmarks.add(event.target);
}).on('complete', function onComplete() {
    benchmarks.log();
}).run();