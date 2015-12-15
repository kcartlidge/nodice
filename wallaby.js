module.exports = function () {
  return {
    files: [
      'lib/*.js'
    ],

    tests: [
      'tests/*spec.js'
    ],

    env: {
      type: 'node',
      params: {
        runner: '--harmony --harmony_arrow_functions'
      }
    }
  };
};
