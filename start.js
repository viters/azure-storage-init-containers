"use strict";

const { BlobServiceClient } = require("@azure/storage-blob");

async function main() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
  );
  const publicContainers = (process.env.AZURE_STORAGE_PUBLIC_CONTAINERS || "")
    .split(",")
    .filter((a) => typeof a === "string" && a.length > 0);
  const privateContainers = (process.env.AZURE_STORAGE_PRIVATE_CONTAINERS || "")
    .split(",")
    .filter((a) => typeof a === "string" && a.length > 0);

  const containers = publicContainers
    .map((name) => ({ type: "public", name }))
    .concat(privateContainers.map((name) => ({ type: "private", name })));

  for (const container of containers) {
    console.log(`- Creating "${container.name}" container...`);
    const containerClient = blobServiceClient.getContainerClient(
      container.name
    );
    try {
      await containerClient.create();
      if (container.type === "public") {
        console.log(
          `--- Setting public access policy on "${container.name}" container...`
        );
        await containerClient.setAccessPolicy("blob");
      }
      console.log(`--- ✅  Container "${container.name}" ready`);
    } catch (e) {
      if (
        typeof e === "object" &&
        e.hasOwnProperty("details") &&
        e.details.code === "ContainerAlreadyExists"
      ) {
        console.log(
          `--- Container "${container.name}" already exists, skipping...`
        );
      } else {
        throw e;
      }
    }
  }
}

main()
  .then(() => console.log("✨ Done"))
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
