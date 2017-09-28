const request = require('./request');

const SDKS = ['alidns', 'cdn', 'cloudpush', 'cs', 'dm', 'drds', 'ecs', 'ess', 'httpdns', 'iot', 'metrics', 'mts', 'ram', 'rds', 'slb', 'sts', 'sms', 'dysms'];

const DEFAULTS = {
  AccessKeyId: '',
  // Signature: '',
  SignatureMethod: 'HMAC-SHA1',
  Format: 'json',
  // Version: '2014-05-26',
  SignatureVersion: '1.0',
  SignatureNonce: Math.random(),
  Timestamp: new Date().toISOString()
};

const lazyLoad = (service) => (options) => {
  /* eslint global-require:0 */
  const settings = require(`./settings/${service}`);
  return new Proxy({}, {
    get: (target, property) =>
      (opts) => {
        const action = property.toLowerCase();
        if (action === 'version') {
          return settings.version;
        }
        let params = Object.assign({}, DEFAULTS, options);
        params = Object.assign({ Action: property }, params, opts);
        params.method = settings.actions[action] || 'get';
        if (params.Version === undefined) {
          params.Version = settings.version;
        }
        return request(settings.api, params);
      }
  });
};

SDKS.forEach((item) => {
  exports[item] = lazyLoad(item);
  exports[item.toUpperCase()] = lazyLoad(item);
});
