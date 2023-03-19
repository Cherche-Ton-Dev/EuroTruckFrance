const e = require("node:child_process");

// e.exec("yarn start");
// e.fork()
const child = e.spawn(
  "C:/Program Files/nodejs/node.exe",
  ["-r", "ts-node/register", "-r", "tsconfig-paths/register", "./src/index.ts"],
  {
    env: { ...process.env, FORCE_COLOR: "1" },
  }
);

child.stdout.on("data", (data) => {
  console.log(data.toString().trim());
});

child.stderr.on("data", (data) => {
  console.error(data.toString().trim());
});
