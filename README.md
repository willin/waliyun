# WAliyun

比官方SDK更好用的阿里云SDK。

[![npm](https://img.shields.io/npm/v/waliyun.svg?style=plastic)](https://npmjs.org/package/waliyun) [![npm](https://img.shields.io/npm/dm/waliyun.svg?style=plastic)](https://npmjs.org/package/waliyun)
[![npm](https://img.shields.io/npm/dt/waliyun.svg?style=plastic)](https://npmjs.org/package/waliyun)

Minimum, Flexible, Scalable.

支持Lazy Require。

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装和使用](#%E5%AE%89%E8%A3%85%E5%92%8C%E4%BD%BF%E7%94%A8)
  - [查看接口对应版本](#%E6%9F%A5%E7%9C%8B%E6%8E%A5%E5%8F%A3%E5%AF%B9%E5%BA%94%E7%89%88%E6%9C%AC)
- [已支持的接口](#%E5%B7%B2%E6%94%AF%E6%8C%81%E7%9A%84%E6%8E%A5%E5%8F%A3)
  - [CDN](#cdn)
  - [移动推送 CLOUDPUSH](#%E7%A7%BB%E5%8A%A8%E6%8E%A8%E9%80%81-cloudpush)
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
  - [容器服务 CS](#%E5%AE%B9%E5%99%A8%E6%9C%8D%E5%8A%A1-cs)
- [CHANGELOG](#changelog)
  - [v2.0.0](#v200)
  - [v1.0.0](#v100)
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
  // 选填，不同接口类型注意版本日期，2.0.0之后版本会带上默认版本，但可能会落后于最新，需要注意
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
var ecs = WALIYUN.ECS(options);
ecs.describeInstances({
  RegionId: 'cn-hangzhou'
}).then(function(instances){
  // xxxx
});
```

ES7:

```js
import {ECS} from 'waliyun';
const ecs = ECS(options);
// Within Async Func
(async() => {
  const instances = await ecs.describeInstances({
    RegionId: 'cn-hangzhou'
  });
  // xxxx
});
```

### 查看接口对应版本

ES7:

```js
import {ECS} from 'waliyun';
const ecs = ECS(options);
console.log(ecs.version());
```

## 已支持的接口

### CDN

API文档参考： <https://help.aliyun.com/document_detail/27155.html>

### 移动推送 CLOUDPUSH

API文档参考： <https://help.aliyun.com/document_detail/30074.html>

### 分布式关系型数据库 DRDS

API文档参考： <https://help.aliyun.com/document_detail/35276.html>

### 云服务器 ECS

API文档参考： <https://help.aliyun.com/document_detail/25485.html>

ES7 示例:

```js
import {ECS} from 'waliyun';

(async() => {
  const ces = ECS({
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

API文档参考： <https://help.aliyun.com/document_detail/25925.html>

### HTTPDNS

API文档参考： <https://help.aliyun.com/document_detail/30122.html>

### 阿里云物联网套件 IOT

API文档参考： <https://help.aliyun.com/document_detail/30557.html>

ES7 示例：

```js
import {IOT} from 'waliyun';

(async() => {
  const iot = IOT({
    AccessKeyId: 'xxxx',
    AccessKeySecret: 'xxxxx',
    Version: '2016-05-30'
  });
  const data = await iot.sub({
    ProductKey: 'xxxx',
    SubCallback: 'http://xxxx:xxx/',
    'Topic.1': '/ProductKey/Topic'
  });
  console.log(data);
})();
```

### 云监控 METRICS

API文档参考： <https://help.aliyun.com/document_detail/28616.html>

ES7 示例：

```js
import {METRICS} from 'waliyun';

(async() => {
  const metrics = METRICS({
    AccessKeyId: 'xxxxxx',
    AccessKeySecret: 'xxxxxx',
    Version: '2015-10-20',
    RegionId: 'cn-hangzhou'
  });
  const data = await metrics.queryMetric({
    Project: 'acs_rds',
    Metric: 'CpuUsage',
    Period: '300',
    StartTime: new Date() - 60 * 1000 * 1000,
    Dimensions: '{instanceId:\'xxxxxx\'}'
  });
  console.log(data.Datapoints);
})();
```

### 媒体转码 MTS

API文档参考： <https://help.aliyun.com/document_detail/29212.html>

### 访问控制 RAM

API文档参考： <https://help.aliyun.com/document_detail/28672.html>

### 云数据库 RDS

API文档参考： <https://help.aliyun.com/document_detail/26226.html>

### 负载均衡 SLB

API文档参考： <https://help.aliyun.com/document_detail/27566.html>

### 访问控制 STS

API文档参考： <https://help.aliyun.com/document_detail/28756.html>

ES5示例:

```js
var WALIYUN = require('waliyun');
var sts = WALIYUN.STS({
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

const sts = STS({
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


### 容器服务 CS

API文档参考： <https://help.aliyun.com/document_detail/26043.html>

注意，容器服务版本号停留在：2015-12-15。新版改动较为奇葩，暂不支持。

旧版本方法列表：

```js
[
  'GetClusterList',
  'CreateCluster',
  'DeleteCluster',
  'GetClusterById',
  'GetClusterCerts',
  'UpdateClusterSizeById',
  'ListProjects',
  'CreateProject',
  'RetrieveProject',
  'StartProject',
  'StopProject',
  'UpdateProject',
  'DeleteProject'
]
```

## CHANGELOG

### v2.0.0

2016-09-06 使用元编程方式进行重构，减少重复代码和`Action`限制。

### v1.0.0

2016-05-16 解决了签名偶发错误的问题。

## License

MIT

通过支付宝捐赠：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)
