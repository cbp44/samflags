// used to create a map between the hex code and the actual english description
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

const flagMap = new Map(samFlags);

/**
 * isFlagEnabled - check if flag is enabled in flags
 *
 * @param {Number} flags The SAM flag(s) to check agains.
 * @param {Number} flag  The SAM flag we want to check if it is enabled or not.
 *
 * @returns {Boolean} whether or not flag is found within flags
 */
const isFlagEnabled = (flags, flag) => flags & flag;

/**
 * getFlagNumbers - Returns the flag numbers that were found in flag.
 *
 * @param {Number} flag The SAM flag number to get flag strings for e.g. 516.
 *
 * @returns {Array} An array containing the SAM flags that were found in flag.
 */
const getFlagNumbers = (flag) => {
  let flagsFound = [];

  flagMap.forEach((flagDescription, flagValue) => {
    if (isFlagEnabled(flag, flagValue)) flagsFound.push(flagValue);
  })

  return flagsFound;
}


/**
 * getFlagStrings - Returns the descriptions of the flags that were found in flag.
 *
 * @param {Number} flag The SAM flag number to get flag strings for e.g. 516.
 *
 * @returns {Array} An array containing the descriptions of the SAM flags that were found in flag.
 */
const getFlagStrings = (flag) => flagNumbersToStrings(getFlagNumbers(flag));

/**
 * flagNumberToString - Return the string description that corresponds to flag.
 *
 * @param {Number} flag The SAM flag number to get flag strings for e.g. 0x2.
 *
 * @returns {String} The description of the SAM flag number. Returns undefined if not found.
 */
const flagNumberToString = (flag) => flagMap.get(flag);

/**
 * flagNumbersToStrings - Return an array of strings that correspond to the flags given in the flagArray.
 *
 * @param {Array} flagArray An array of individual SAM flag numbers, such as the one provided by the getFlags function.
 *
 * @returns {Array} An array of strings describing the flags in the flagArray
 */
const flagNumbersToStrings = (flagArray) => flagArray.map(flagNumberToString);




module.exports = {
  getFlagNumbers,
  getFlagStrings,
  flagNumbersToStrings,
  flagNumberToString,
  isFlagEnabled,
  flagMap
};
