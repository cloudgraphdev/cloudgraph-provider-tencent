# CloudGraph Tencent Provider

Use the CloudGraph Tencent Provider to scan and normalize cloud infrastructure using the [Tencent Cloud SDK](https://intl.cloud.tencent.com/document/product/583/19694)

<!-- toc -->

- [CloudGraph Tencent Provider](#cloudgraph-tencent-provider)
- [Install](#install)
- [Authentication](#authentication)
- [Multi Account](#multi-account)
- [Configuration](#configuration)
- [Supported Services](#supported-services)
<!-- tocstop -->

# Install

Install the Tencent provider in CloudGraph

```
cg init tencent
```

# Authentication


# Multi Account


# Configuration

CloudGraph creates a configuration file at:

- UNIX: `~/.config/cloudgraph/.cloud-graphrc.json`
- Windows: `%LOCALAPPDATA%\cloudgraph/.cloud-graphrc.json`

NOTE: CloudGraph will output where it stores the configuration file and provider data as part of the `cg init` command

CloudGraph will generate this configuration file when you run `cg init tencent`. You may update it manually or by running `cg init tencent` again.

CloudGraph Tencent Provider will ask you what regions you would like to crawl and will by default crawl for **all** supported resources in **selected** regions in the **default** account. You can update the `regions` or `resources` fields in the `cloud-graphrc.json` file to change this behavior. You can also select which `resources` to crawl in the `cg init tencent` command by passing the the `-r` flag: `cg init tencent -r`

# Supported Services

| Service | Relations |
| ------------------- | ------------------- |
