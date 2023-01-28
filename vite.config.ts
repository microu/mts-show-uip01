import fs from "node:fs";

let server_options: object = {};
if (!process.env.OS || !process.env.OS.toLowerCase().startsWith("windows")) {
  server_options = {
    https: {
      key: fs.readFileSync("/home/michel/minica/localhost/key.pem"),
      cert: fs.readFileSync("/home/michel/minica/localhost/cert.pem"),
    },
  };
}


export default {
  // config options
  server: server_options,
};
