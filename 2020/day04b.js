const fs = require('fs')

fs.promises.readFile("day04.in", {encoding: 'utf8'})
  .then((dataString) => {
    const lines = dataString.split("\n\n")
    solve(
      // Object.fromEntries reconstructs object from list of [key, value] pairs
      // we "actually want an object passport"
      lines.map(s => Object.fromEntries(
          [...s.matchAll(/(?<key>\w*):(?<value>\S*)/g)]
            .map(match => [match.groups.key, match.groups.value])
        )
      )
    )
  })

function isStringInRange(string, lo, hi) {
  const val = parseInt(string)
  return val >= lo && val <= hi;
}

function isValidHeight(heightString) {
  const match = heightString.match(/^(?<value>\d+)(?<unit>cm|in)$/)
  if (match === null) {
    return false
  }
  if (match.groups.unit == "cm") {
    return isStringInRange(match.groups.value, 150, 193);
  }
  if (match.groups.unit == "in") {
    return isStringInRange(match.groups.value, 59, 76);
  }
}

function solve(passports) {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const validEyes = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
  let total = 0;
  for (let passport of passports) {
    console.log(passport)
    total += (
      requiredFields.every(field => passport[field] !== undefined)
      && isStringInRange(passport["byr"], 1920, 2002)
      && isStringInRange(passport["iyr"], 2010, 2020)
      && isStringInRange(passport["eyr"], 2020, 2030)
      && isValidHeight(passport["hgt"])
      && passport["hcl"].match(/^#[0-9a-f]{6}$/) !== null
      && validEyes.includes(passport["ecl"])
      && passport["pid"].match(/^\d{9}$/) !== null
    )
  }
  console.log(total)
}
