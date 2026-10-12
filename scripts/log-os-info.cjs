#!/usr/bin/env node
const { collectOsInfo, createLogglyLogger } = require("./loggly-logger.cjs");

const logger = createLogglyLogger({ tags: "Winston-NodeJS,os-info" });
const osInfo = collectOsInfo();

logger.info("Host OS snapshot", osInfo);

logger.on("finish", () => process.exit(0));
logger.end();

setTimeout(() => {
  console.error("Timed out waiting for Loggly transport to finish.");
  process.exit(1);
}, 10_000).unref();
