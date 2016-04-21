# WAliyun

Minimum, Flexible, Scalable.

支持Lazy Require。

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [安装和使用](#%E5%AE%89%E8%A3%85%E5%92%8C%E4%BD%BF%E7%94%A8)
- [已支持的接口](#%E5%B7%B2%E6%94%AF%E6%8C%81%E7%9A%84%E6%8E%A5%E5%8F%A3)
  - [CDN](#cdn)
  - [云服务器 ECS](#%E4%BA%91%E6%9C%8D%E5%8A%A1%E5%99%A8-ecs)
  - [云监控 Metrics](#%E4%BA%91%E7%9B%91%E6%8E%A7-metrics)
  - [访问控制 RAM](#%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6-ram)
  - [云数据库 RDS](#%E4%BA%91%E6%95%B0%E6%8D%AE%E5%BA%93-rds)
  - [访问控制 STS](#%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6-sts)

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
  // 每次请求都会自动重新生成
  SignatureNonce: Math.random(),
  Timestamp: new Date().toISOString()
};
```

ES5:

```js
var WALIYUN = require('waliyun');
// 加载全部方法
var ecs = WALIYUN.ECS(options);
// 或加载某些方法
var ecs = WALIYUN.ECS(options, ['DescribeInstances', 'DescribeInstanceStatus']);
// 或加载某个方法
var ecs = WALIYUN.ECS(options, 'DescribeInstances');
ecs.describeInstances({
  RegionId: 'cn-hangzhou'
}).then(function(instances){
  // xxxx
});
```

ES6:

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

## 已支持的接口

### CDN

API文档参考： <https://help.aliyun.com/document_detail/cdn/api-reference/overview.html>

### 云服务器 ECS

API文档参考： <https://help.aliyun.com/document_detail/ecs/open-api/apisummary.html>

### 云监控 Metrics

API文档参考：<https://help.aliyun.com/document_detail/cms/API_References/New_Metric_OpenAPI_Reference/API_Guide.html>

### 访问控制 RAM

API文档参考：<https://help.aliyun.com/document_detail/ram/ram-api-reference/intro/intro.html>

### 云数据库 RDS

API文档参考：<https://help.aliyun.com/document_detail/rds/OpenAPI-manual/RDS-OpenAPI-Invoke/API-catalog.html>

### 访问控制 STS

API文档参考：<https://help.aliyun.com/document_detail/ram/sts-api-reference/intro.html>
