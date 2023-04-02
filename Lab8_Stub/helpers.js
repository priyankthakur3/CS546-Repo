const isString = (varName, varVal) => {
  /**
   * Function to check if string is string or not
   * Input Variable Name, Variable Value in String
   * Return type: trim varVal in String
   */
  if (typeof varName !== "string" || varName.trim().length < 1)
    throw new Error(`Expected VarName to be non-empty String`);

  if (typeof varVal !== "string" || varVal.trim().length < 1)
    throw new Error(`Expected ${varName} to be non-empty String`);

  return varVal.trim();
};

export { isString };
