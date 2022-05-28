# CloudGraph Tencent Provider

Use the CloudGraph Tencent Provider to scan and normalize cloud infrastructure using the [Tencent Cloud SDK](https://intl.cloud.tencent.com/document/product/583/19694)

<!-- toc -->

- [CloudGraph Tencent Provider](#cloudgraph-tencent-provider)
- [Install](#install)
- [Authentication](#authentication)
- [Configuration](#configuration)
- [Supported Services](#supported-services)
<!-- tocstop -->

# Install

Install the Tencent provider in CloudGraph

```
cg init tencent
```

# Authentication

Authenticate the CloudGraph Tencent Provider using one or more SecretId/SecretKey pair(s). Visit the TencentCloud API Key page to apply for
security credentials:

- [TencentCloud API Key](https://console.cloud.tencent.com/capi)

# Configuration

CloudGraph creates a configuration file at:

- UNIX: `~/.config/cloudgraph/.cloud-graphrc.json`
- Windows: `%LOCALAPPDATA%\cloudgraph/.cloud-graphrc.json`

NOTE: CloudGraph will output where it stores the configuration file and provider data as part of the `cg init` command

CloudGraph will generate this configuration file when you run `cg init tencent`. You may update it manually or by running `cg init tencent` again.

```
"tencent": {
  "accounts": [
    {
      "secretId": "AKIDz8krbsJ5yKBZQpn74WFkmLPx3*******",
      "secretKey": "Gu5t9xGARNpq86cd98joQYCN3*******"
    }
  ],
  "regions": "ap-bangkok,ap-jakarta,ap-beijing,ap-chengdu,ap-chongqing,ap-guangzhou,ap-shenzhen-fsi,ap-hongkong,ap-mumbai,ap-nanjing,ap-seoul,ap-tokyo,ap-shanghai,ap-shanghai-fsi,ap-singapore,eu-frankfurt,eu-moscow,na-ashburn,na-siliconvalley,na-toronto,sa-saopaulo",
  "resources": "subnet,vpc"
}
```

CloudGraph Tencent Provider will ask you what regions you would like to crawl and will by default crawl for **all** supported resources in **selected** regions in the **default** account. You can update the `regions` or `resources` fields in the `cloud-graphrc.json` file to change this behavior. You can also select which `resources` to crawl in the `cg init tencent` command by passing the the `-r` flag: `cg init tencent -r`

# Supported Services

| Service | Relations |
| ------------------- | ------------------- |
| customerGateway | vpnConnection |
| routeTable | vpc, subnet |
| securityGroup | | 
| securityGroupRule | |
| ccn | ccnAttachment |
| ccnAttachment | ccn |
| subnet | vpc, routeTable |
| vpc | subnet, vpnGateway, routeTable, vpnConnection |
| vpnConnection | vpc, vpnGateway, customerGateway |
| vpnGateway | vpc, vpnGatewayRoute, vpnConnection |
| vpnGatewayRoute | vpnGateway |
