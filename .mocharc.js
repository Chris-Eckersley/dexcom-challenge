module.exports = {
  spec: "test/**/*.spec.js",
  diff: true,
  extension: ['js'],
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 4000,
  ui: 'bdd',
};
