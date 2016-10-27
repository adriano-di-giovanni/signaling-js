module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],
    files: [
      './signaling.js',
      'test/index.js'
    ],
    reporters: [
      'progress'
    ],
    port: 9876,
    colors: true,
    browsers: [
      'PhantomJS'
    ],
    singleRun: true,
    concurrency: Infinity
  })
}
