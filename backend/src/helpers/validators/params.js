import { MissingKeySyntaxError, KeyTypeSyntaxError } from "../../errors/syntax";

// Takes in the following data structure and sees that the objects passed in
// are present and of the type required
// paramMap = {
//   someObject: {
//     data: any.object,
//     expectedType: "object"
//   },
//   someString: {
//     data: "some string",
//     expectedType: "string"
//   },
//   someNumber: {
//     data: 40,
//     expectedType: "number"
//   }
// }
export const checkParams = (paramMap) => {
  Object.entries(paramMap).forEach((item) => {
    const key = item[0];
    const value = item[1];

    if (value.data === undefined) {
      throw new MissingKeySyntaxError("request parameter", key);
    }

    if (typeof value.data !== value.expectedType) {
      throw new KeyTypeSyntaxError(
        "request parameter",
        key,
        value.expectedType
      );
    }
  });
};
