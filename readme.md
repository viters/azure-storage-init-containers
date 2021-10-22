# Azure Storage init containers

This script prepares blob containers on the given Azure Storage instance. It is wrapped up into Docker container for easy usage in Kubernetes or other contenerized environment.

### Configuration

| Name                               | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| `AZURE_STORAGE_CONNECTION_STRING`  | Azure Storage connection string.                             |
| `AZURE_STORAGE_PUBLIC_CONTAINERS`  | List of comma separated container names that will be created and assigned public blob policy. |
| `AZURE_STORAGE_PRIVATE_CONTAINERS` | List of comma separated container names that will be created. |

### Usage

```
$ docker pull lukaszczesniak/azure-storage-init-containers
```
