const debug = require('debug');
const crypto = require('crypto');
const request = require('request');

/**
 * getDefer
 * @return {object} deferred
 */
const getDefer = () => {
  const deferred = {};
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
};

const escaper = str => encodeURIComponent(str)
  .replace(/\*/g, '%2A')
  .replace(/'/g, '%27')
  .replace(/!/g, '%21')
  .replace(/"/g, '%22')
  .replace(/\(/g, '%28')
  .replace(/\)/g, '%29')
  .replace(/\+/, '%2B');

const getSignature = (params, secret, method = 'get') => {
  const canoQuery = Object.keys(params).sort().map(key => `${escaper(key)}=${escaper(params[key])}`).join('&');
  const stringToSign = `${method.toUpperCase()}&${escaper('/')}&${escaper(canoQuery)}`;
  let signature = crypto.createHmac('sha1', `${secret}&`);
  signature = signature.update(stringToSign).digest('base64');
  return escaper(signature);
};

module.exports = (host, params = {}, timeout = 5000) => {
  let method = 'get';
  if (params.method) {
    method = params.method;
    delete params.method;
  }
  const secret = params.AccessKeySecret;
  delete params.AccessKeySecret;

  params.SignatureNonce = Math.random();
  params.Timestamp = new Date().toISOString();

  const signature = getSignature(params, secret, method);
  const deferred = getDefer();
  if (method === 'get') {
    const query = Object.keys(params).sort().map(key => `${escaper(key)}=${escaper(params[key])}`).join('&');
    const url = `${host}?${query}&Signature=${signature}`;
    debug('waliyun:common:url')(url);
    request.get(url, { timeout: parseInt(timeout, 10) }, (err, res) => {
      if (err) {
        deferred.reject(err);
      }
      try {
        deferred.resolve(JSON.parse(res.body));
      } catch (e) {
        deferred.reject(err);
      }
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
      try {
        deferred.resolve(JSON.parse(res.body));
      } catch (e) {
        deferred.reject(err);
      }
    });
  }
  return deferred.promise;
};
