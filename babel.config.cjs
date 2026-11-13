// Babel используется только Jest для преобразования JSX и ES-модулей
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], ['@babel/preset-react', { runtime: 'automatic' }]],
};
