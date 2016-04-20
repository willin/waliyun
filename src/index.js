import fs from 'fs';
const lazyLoad = (service) => (() => require(`./${service}`))().default;
const list = fs.readdirSync(__dirname);

list.forEach((item) => {
  if (fs.statSync(`${__dirname}/${item}`).isDirectory()) {
    exports[item.toUpperCase()] = lazyLoad(item);
  }
});
