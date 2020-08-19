export class MissingKeySyntaxError extends Error {
  constructor(dataName, expectedKey) {
    super();
    this.name = "MissingKeySyntaxError";
    // The name or id of the data that failed the syntax check
    this.dataName = dataName
    this.expectedKey = expectedKey
  }
}

export class KeyTypeSyntaxError extends Error {
  constructor(dataName, expectedKey, expectedType) {
    super();
    this.name = "KeyTypeSyntaxError";
    // The name or id of the data that failed the syntax check
    this.dataName = dataName
    this.expectedKey = expectedKey
    this.expectedType = expectedType
  }
}
