const samFlags = [[0x1, "Read paired"],
        [0x2, "Read mapped in proper pair"],
        [0x4, "Read unmapped"],
        [0x8, "Mate unmapped"],
        [0x10, "Read reverse strand"],
        [0x20, "Mate reverse strand"],
        [0x40, "First in pair"],
        [0x80, "Second in pair"],
        [0x100, "Not primary alignment"],
        [0x200, "Read fails platform/vendor quality checks"],
        [0x400, "Read is PCR or optical duplicate"],
        [0x800, "Supplementary alignment"]];

let flagMap = new Map(samFlags);

// check whether the samFlags contains the given flag
const checkFlag = (samFlags, flag) => {
  return samFlags & flag;
}

module.exports = (flags) => {
  flags = flags.map(f => parseInt(f)).filter(f => !isNaN(f));

  flags.forEach((flag) => {
    console.log(`Checking ${flag}...`);
    flagMap.forEach((desc, flagValue) => {
      if (checkFlag(flag, flagValue)) {
        // does have this flag so print it out
        console.log(desc);
      }
    });

    console.log();
  })
}
