# azf-shared-observatory

Listens to topic. Triggers observatory test.

## Azure

You'll need a valid subscription and to setup the following resources

- resource group
- app service plan
- storage account
- servicebus namespace
- servicebus topic (in and out)
- servicebus topic subscription

### Setup function

The easiest way to make this function run is to setup an app service, configure the app and get the function from GitHub.

- add function app
  - Runtime stack -> Node

Configuration for app (Application settings)
```
SERVICEBUS_CONNECTION_IN=sb-sharedaccesspolicies-rootmanagesharedaccesskey-primaryconnectionstring
SERVICEBUS_TOPIC_IN=name-for-topic-to-subscribe-to
SERVICEBUS_TOPIC_SUBSCRIPTION=name-for-topic-subscription
SERVICEBUS_CONNECTION_OUT=sb-sharedaccesspolicies-rootmanagesharedaccesskey-primaryconnectionstring
SERVICEBUS_TOPIC_OUT=name-for-topic-to-publish-to
```

- add function
  - Plattform features -> deployment center
  - github
  - branch master

## Setup development

`local.settings.json`

```JavaScript
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "<storage-accesskeys-key1-connectionstring>",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "SERVICEBUS_CONNECTION_IN": "<sb-sharedaccesspolicies-rootmanagesharedaccesskey-primaryconnectionstring>",
    "SERVICEBUS_TOPIC_IN": "<name-for-topic-to-subscribe-to>",
    "SERVICEBUS_TOPIC_SUBSCRIPTION": "<name-for-topic-subscription>",
    "SERVICEBUS_CONNECTION_OUT": "<sb-sharedaccesspolicies-rootmanagesharedaccesskey-primaryconnectionstring>",
    "SERVICEBUS_TOPIC_OUT": "<name-for-topic-to-publish-to>"
  }
}
```

# License

[MIT](LICENSE)
