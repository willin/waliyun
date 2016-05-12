# WAliyun

[![npm](https://img.shields.io/npm/v/waliyun.svg?style=plastic)](https://npmjs.org/package/waliyun) [![npm](https://img.shields.io/npm/dm/waliyun.svg?style=plastic)](https://npmjs.org/package/waliyun)

Minimum, Flexible, Scalable.

支持Lazy Require。

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装和使用](#%E5%AE%89%E8%A3%85%E5%92%8C%E4%BD%BF%E7%94%A8)
- [已支持的接口](#%E5%B7%B2%E6%94%AF%E6%8C%81%E7%9A%84%E6%8E%A5%E5%8F%A3)
  - [CDN](#cdn)
  - [移动推送 CLOUDPUSH](#%E7%A7%BB%E5%8A%A8%E6%8E%A8%E9%80%81-cloudpush)
  - [容器服务 CS](#%E5%AE%B9%E5%99%A8%E6%9C%8D%E5%8A%A1-cs)
  - [分布式关系型数据库 DRDS](#%E5%88%86%E5%B8%83%E5%BC%8F%E5%85%B3%E7%B3%BB%E5%9E%8B%E6%95%B0%E6%8D%AE%E5%BA%93-drds)
  - [云服务器 ECS](#%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8-ecs)
  - [弹性伸缩 ESS](#%E5%BC%B9%E6%80%A7%E4%BC%B8%E7%BC%A9-ess)
  - [HTTPDNS](#httpdns)
  - [阿里云物联网套件 IOT](#%E9%98%BF%E9%87%8C%E4%BA%91%E7%89%A9%E8%81%94%E7%BD%91%E5%A5%97%E4%BB%B6-iot)
  - [云监控 METRICS](#%E4%BA%91%E7%9B%91%E6%8E%A7-metrics)
  - [媒体转码 MTS](#%E5%AA%92%E4%BD%93%E8%BD%AC%E7%A0%81-mts)
  - [访问控制 RAM](#%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6-ram)
  - [云数据库 RDS](#%E4%BA%91%E6%95%B0%E6%8D%AE%E5%BA%93-rds)
  - [负载均衡 SLB](#%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1-slb)
  - [访问控制 STS](#%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6-sts)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## 安装和使用

国际惯例：

```
npm install waliyun --save
```

公共参数：

```js
var options = {
  AccessKeyId: 'xxxx-xxxx-xxxx-xxxx',
  AccessKeySecret: 'xxxx-xxxx-xxxx-xxxx',
  // 选填，不同接口类型注意版本日期
  Version: '2014-05-26',
  // 选填
  SignatureMethod: 'HMAC-SHA1',
  Format: 'json',
  SignatureVersion: '1.0',
  // 不填，每次请求都会自动重新生成
  SignatureNonce: Math.random(),
  Timestamp: new Date().toISOString()
};
```

ES5:

```js
var WALIYUN = require('waliyun');
// 加载全部方法
var ecs = new WALIYUN.ECS(options);
// 或加载某些方法
var ecs = new WALIYUN.ECS(options, ['DescribeInstances', 'DescribeInstanceStatus']);
// 或加载某个方法
var ecs = new WALIYUN.ECS(options, 'DescribeInstances');
ecs.describeInstances({
  RegionId: 'cn-hangzhou'
}).then(function(instances){
  // xxxx
});
```

ES7:

```js
import {ECS} from 'waliyun';
const ecs = new ECS(options);
// Within Async Func
(async() => {
  const instances = await ecs.describeInstances({
    RegionId: 'cn-hangzhou'
  });
  // xxxx
});
```

## 已支持的接口

### CDN

API文档参考： <https://help.aliyun.com/document_detail/cdn/api-reference/overview.html>

### 移动推送 CLOUDPUSH

API文档参考： <https://help.aliyun.com/document_detail/mobilepush/api-reference/openapi.html>

### 容器服务 CS

API文档参考： <https://help.aliyun.com/document_detail/containerservice/api-reference/overview.html>

### 分布式关系型数据库 DRDS

API文档参考： <https://help.aliyun.com/document_detail/drds/open-api/user_open_api.html>

### 云服务器 ECS

API文档参考： <https://help.aliyun.com/document_detail/ecs/open-api/apisummary.html>

ES7 示例:

```js
import {ECS} from 'waliyun';

(async() => {
  const ces = new ECS({
    AccessKeyId: 'xxxx',
    AccessKeySecret: 'xxxx',
    Version: '2014-05-26'
  });
  const data = await ces.describeInstances({
    RegionId: 'cn-hangzhou'
  });
  console.log(data.Instances.Instance);
})();
```

### 弹性伸缩 ESS

API文档参考： <https://help.aliyun.com/document_detail/ess/api-document/api-use-notes.html>

### HTTPDNS

API文档参考： <https://help.aliyun.com/document_detail/httpdns/openapi/summary.html>

### 阿里云物联网套件 IOT

API文档参考： <https://help.aliyun.com/document_detail/iot/API/call-method/summary.html>

### 云监控 METRICS

API文档参考： <https://help.aliyun.com/document_detail/cms/API_References/New_Metric_OpenAPI_Reference/API_Guide.html>

### 媒体转码 MTS

API文档参考： <https://help.aliyun.com/document_detail/mts/api-reference/intro/intro.html>

### 访问控制 RAM

API文档参考： <https://help.aliyun.com/document_detail/ram/ram-api-reference/intro/intro.html>

### 云数据库 RDS

API文档参考： <https://help.aliyun.com/document_detail/rds/OpenAPI-manual/RDS-OpenAPI-Invoke/API-catalog.html>

### 负载均衡 SLB

API文档参考： <https://help.aliyun.com/document_detail/slb/api-reference/api-overview.html>

### 访问控制 STS

API文档参考： <https://help.aliyun.com/document_detail/ram/sts-api-reference/intro.html>

ES5示例:

```js
var WALIYUN = require('waliyun');
var sts = new WALIYUN.STS({
  AccessKeyId: 'xxxx',
  AccessKeySecret: 'xxxx',
  Version: '2015-04-01'
});
sts.AssumeRole({
  RoleArn: 'acs:ram::xxxx:role/xxxx',
  RoleSessionName: 'xxxxx'
},'post').then(function(token){
  // xxxx
});
```

ES7 示例：

```js
import {STS} from 'waliyun';

const sts = new STS({
  AccessKeyId: 'xxxx',
  AccessKeySecret: 'xxxx',
  Version: '2015-04-01'
});

(async() => {
  const token = await sts.AssumeRole({
    RoleArn: 'acs:ram::xxxx:role/xxxx',
    RoleSessionName: 'xxxxx'
  },'post');
  // xxxx
})();

```

## License

MIT
