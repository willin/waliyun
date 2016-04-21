import {BASE, getUrl} from '../common';
import ACTIONS from './list';
const API = 'https://cloudpush.aliyuncs.com/';

export default class CLOUDPUSH extends BASE {
  constructor(options, acts = ACTIONS) {
    super(options);
    const actions = typeof acts === 'string' ? [acts] : acts;
    actions.forEach(action => {
      this[action] = this[action.replace(/(\w)/, v => v.toLowerCase())] = async(opts) => {
        this.params = Object.assign({Action: action}, BASE.options, opts);
        this.params.SignatureNonce = Math.random();
        this.params.Timestamp = new Date().toISOString();
        return getUrl(API, this.params, BASE.secret);
      };
    });
  }
}
