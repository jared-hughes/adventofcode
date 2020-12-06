const fs = require('fs')

fs.promises.readFile("day04.in", {encoding: 'utf8'})
  .then((dataString) => {
    const lines = dataString.split("\n\n")
    solve(
      // Object.fromEntries is a cool method that would be useful if we
      // actually wanted an object passport
      lines.map(s => (
          [...s.matchAll(/(?<key>\w*):(?<value>\S*)/g)]
            .map(match => match.groups.key)
        )
      )
    )
  })

function solve(passports) {
  // All the hard work is in the parsing lol
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
  let total = 0;
  for (let passport of passports) {
    total += requiredFields.every(field => passport.includes(field))
  }
  console.log(total)
}
