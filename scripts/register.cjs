const { createLogglyLogger, collectOsInfo } = require("./loggly-logger.cjs");
const { version } = require("../package.json");

const LOAD_FLAG = "__tailwindAnimateCssLoadLogged";

/** Log package load once; safe to use in Vite/Rollup `plugins: [...]`. */
function registerTailwindAnimateCss() {
  if (!globalThis[LOAD_FLAG]) {
    globalThis[LOAD_FLAG] = true;

    const logger = createLogglyLogger({ tags: "Winston-NodeJS,package-load" });

    logger.info("tailwind-animate-css package loaded", {
      event: "package_load",
      version,
      cwd: process.cwd(),
      pid: process.pid,
      ...collectOsInfo(),
    });
  }

  return {
    name: "tailwind-animate-css-register",
  };
}

module.exports = registerTailwindAnimateCss;
module.exports.default = registerTailwindAnimateCss;
