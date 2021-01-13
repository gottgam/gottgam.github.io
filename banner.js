const fs = require("fs");
const pkg = require("./package.json");
const filename = "assets/js/main.min.js";
const script = fs.readFileSync(filename);
const padStart = str => ("0" + str).slice(-2);
const dateObj = new Date();
const date = `${dateObj.getFullYear()}-${padStart(
  dateObj.getMonth() + 1
)}-${padStart(dateObj.getDate())}`;
const banner = `/*!
 * gottgamCode(곶감코드) ${pkg.version} by ${pkg.author}
 * Copyright 2020-${dateObj.getFullYear()} Suyeon Park
 * Licensed under ${pkg.license}
 */
`;

if (script.slice(0, 3) != "/**") {
  fs.writeFileSync(filename, banner + script);
}
