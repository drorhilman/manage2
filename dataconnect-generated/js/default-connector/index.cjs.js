const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'buss-manage2',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

