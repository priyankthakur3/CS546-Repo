//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const exportedMethods = {
  checkStevensMail(emailid) {
    if (!emailid) throw new Error(`Expected Emailid to be non-empty`);
    if (typeof emailid !== "string" || emailid.trim().length === 0)
      throw new Error(`Expected Emailid to be non-empty string`);
    emailid = emailid.trim().toLowerCase();
    let regex = /^[\w._%+-]+(@[a-z]+\.com)$/;
    if (!regex.test(emailid))
      throw new Error(`Expected email id to be of Stevens`);
    return emailid;
  },

  isStringName(varName, varVal) {
    /**
     * Function to check if string is string or not
     * Input Variable Name, Variable Value in String
     * Return type: trim varVal in String
     */
    let regex = /^[a-zA-Z]{2,25}$/;
    if (typeof varName !== "string" || varName.trim().length < 1)
      throw new Error(`Expected VarName to be non-empty String`);

    if (typeof varVal !== "string" || varVal.trim().length < 1)
      throw new Error(`Expected ${varName} to be non-empty String`);
    varName = varName.trim();
    if (!regex.test(varVal))
      throw new Error(
        `Expected ${varName} to contain characters of length between 2-25`
      );

    return varVal.trim();
  },
};

export default exportedMethods;
