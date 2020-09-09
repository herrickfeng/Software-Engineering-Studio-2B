import { MissingKeySyntaxError, KeyTypeSyntaxError } from "../../errors/syntax";

// Configuration for the task data validation
const requiredKeys = [
  { key: "teacher", type: "boolean" },
  { key: "student", type: "boolean" },
  { key: "admin", type: "boolean" }
];

// TODO: Make this a super function that can be called by all the specific validators
// Call this function to check if a quantum circuit object is valid
// Required keys param is optional if the required keys need to be
// replaced with a different set of required keys
export const checkUserRoles = (taskData) => {
  requiredKeys.forEach((value) => {
    const expectedKey = value.key;
    const expectedType = value.type;
    const data = taskData[expectedKey];

    if (data === undefined) {
      throw new MissingKeySyntaxError("user role", expectedKey);
    }

    if (typeof data !== expectedType) {
      // Workaround for there being no typeof data for arrays
      if (expectedType === "array") {
        if (Array.isArray(data) === false) {
          throw new KeyTypeSyntaxError("user role", expectedKey, expectedType);
        }
      } else {
        throw new KeyTypeSyntaxError("user role", expectedKey, expectedType);
      }
    }
  });
};
