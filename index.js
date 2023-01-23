const fs = require("fs");
const csv = require("csv-parser");

const canadaFile = "./canada.txt";
const usaFile = "./usa.txt";
const inputFile = "./input_countries.csv";

if (fs.existsSync(canadaFile)) {
  fs.rmSync(canadaFile);
}

if (fs.existsSync(usaFile)) {
  fs.rmSync(usaFile);
}

const rows = [];

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (data) => rows.push(data))
  .on("end", () => {
    let canadaData = "country,year,population";
    let usaData = "country,year,population";

    rows
      .filter((x) => x.country === "Canada")
      .forEach(
        (val) =>
          (canadaData += `\n${val.country},${val.year},${val.population}`)
      );
    rows
      .filter((x) => x.country === "United States")
      .forEach(
        (val) => (usaData += `\n${val.country},${val.year},${val.population}`)
      );

    fs.writeFileSync(canadaFile, canadaData);
    fs.writeFileSync(usaFile, usaData);
  });

