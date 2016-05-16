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
const escaper = str => encodeURIComponent(str).replace(/\*/g, '%2A').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\+/, '%2b');
const getSignature = (params, secret, method = 'get') => {
  const canoQuery = Object.keys(params).sort().map(key => `${escaper(key)}=${escaper(params[key])}`).join('&');
  const stringToSign = `${method.toUpperCase()}&${escaper('/')}&${escaper(canoQuery)}`;
  let signature = crypto.createHmac('sha1', `${secret}&`);
  signature = signature.update(stringToSign).digest('base64');
  return escaper(signature);
};

import request from 'request';

exports.sendRequest = (host, params = {}, secret, {method = 'get', timeout = 5000} = {}) => {
  const signature = getSignature(params, secret, method);
  const deferred = getDefer();
  if (method === 'get') {
    const query = Object.keys(params).sort().map(key => `${escaper(key)}=${escaper(params[key])}`).join('&');
    const url = `${host}?${query}&Signature=${signature}`;
    debug('waliyun:common:url')(url);
    request.get(url, {timeout: parseInt(timeout, 10)}, (err, res) => {
      if (err) {
        deferred.reject(err);
      }
      deferred.resolve(JSON.parse(res.body));
    });
  } else {
    params.Signature = signature;
    debug('waliyun:common:params')(params);
    request({
      method: method.toUpperCase(),
      url: host,
      headers: [
        {
          name: 'content-type',
          value: 'application/x-www-form-urlencoded'
        }
      ],
      timeout: parseInt(timeout, 10),
      form: params
    }, (err, res) => {
      if (err) {
        deferred.reject(err);
      }
      deferred.resolve(JSON.parse(res.body));
    });
  }
  return deferred.promise;
};
