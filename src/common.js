import debug from 'debug';

const DEFAULTS = {
  AccessKeyId: '',
  // Signature: '',
  SignatureMethod: 'HMAC-SHA1',
  Format: 'json',
  Version: '2014-05-26',
  SignatureVersion: '1.0',
  SignatureNonce: Math.random(),
  Timestamp: new Date().toISOString()
};

export class BASE {
  constructor(options) {
    BASE.options = Object.assign({}, DEFAULTS, options);
    BASE.secret = BASE.options.AccessKeySecret;
    delete BASE.options.AccessKeySecret;
  }
}

/**
 * getDefer
 * @return {object} deferred
 */
const getDefer = exports.getDefer = () => {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

import crypto from 'crypto';
const _escape = str => encodeURIComponent(str).replace(/\*/g, '%2A');
const _getSignature = (params, secret, method = 'get') => {
  const canoQuery = Object.keys(params).sort().map(key => `${_escape(key)}=${_escape(params[key])}`).join('&');
  const stringToSign = `${method.toUpperCase()}&${_escape('/')}&${_escape(canoQuery)}`;
  debug('common')(stringToSign);
  let signature = crypto.createHmac('sha1', `${secret}&`);
  signature = signature.update(stringToSign).digest('base64');
  debug('common')(signature);
  return signature;
};

import request from 'request';

exports.getUrl = (host, params = {}, secret, method = 'get') => {
  const signature = _getSignature(params, secret, method);
  const query = Object.keys(params).sort().map(key => `${_escape(key)}=${_escape(params[key])}`).join('&');
  const url = `${host}?${query}&Signature=${signature}`;
  debug('common')(url);
  const deferred = getDefer();
  request.get(url, (err, res) => {
    if (err) {
      deferred.reject(err);
    }
    deferred.resolve(JSON.parse(res.body));
  });
  return deferred.promise;
};
