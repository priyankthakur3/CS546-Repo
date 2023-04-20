//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const exportedMethods = {
  checkMail(emailid) {
    if (!emailid) throw new Error(`Expected Emailid to be non-empty`);
    if (typeof emailid !== "string" || emailid.trim().length === 0)
      throw new Error(`Expected Emailid to be non-empty string`);
    emailid = emailid.trim().toLowerCase();
    let regex = /^[\w._%+-]+(@[a-z]+\.com)$/;
    if (!regex.test(emailid)) throw new Error(`Expected proper Email id`);
    return emailid;
  },
  isString(varName, varVal) {
    /**
     * Function to check if string is string or not
     * Input Variable Name, Variable Value in String
     * Return type: trim varVal in String
     */
    if (typeof varName !== "string" || varName.trim().length < 1)
      throw new Error(`Expected VarName to be non-empty String`);

    if (typeof varVal !== "string" || varVal.trim().length < 1)
      throw new Error(`Expected ${varName} to be non-empty String`);

    return varVal.trim().toLowerCase();
  },

  checkPassword(password) {
    let regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length === 0
    ) {
      throw new Error(`Please input proper password`);
    }
    password = password.trim();
    if (!regex.test(password))
      throw new Error(
        `Password must be 8 character long and must contain one uppercase one lowercase one digit and one special character`
      );

    return password;
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
