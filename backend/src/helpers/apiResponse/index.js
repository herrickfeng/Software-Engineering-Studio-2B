import { MissingKeySyntaxError, KeyTypeSyntaxError } from "../../errors/syntax";
import { AuthenticationError } from "../../errors/auth";
import { FirestoreError } from "../../errors/firestore";

export const successResponse = (data) => {
  return {
    status: "OK",
    data: data
  };
};

export const errorResponse = (msg, errorCode, error) => {
  return {
    status: "ERROR",
    msg: msg,
    errorCode: errorCode !== undefined ? errorCode : "unknown",
    error: error !== undefined ? error.toString() : undefined
  };
};

// Pass an express response object to this function and it will return
// an appropriate api error for the error type defaulting to a standard
// error unknown if the error cannot be matched
export const handleApiError = (res, error) => {
  switch (error.constructor) {
    case AuthenticationError:
      return res
        .status(401)
        .json(
          errorResponse(
            "You are not authorized to make this request",
            "auth-key"
          )
        );

    case MissingKeySyntaxError:
      return res
        .status(400)
        .json(
          errorResponse(
            `Key '${error.expectedKey}' is required in '${error.dataName}'.`,
            "key-missing",
            error
          )
        );

    case KeyTypeSyntaxError:
      return res
        .status(400)
        .json(
          errorResponse(
            `Key '${error.expectedKey}' in '${error.dataName}' needs be of type '${error.expectedType}'.`,
            "key-type",
            error
          )
        );

    case FirestoreError:
      if (error.code === "auth") {
        return res
          .status(400)
          .json(
            errorResponse(
              `The requesting user does not have permissions to access the ref at '${error.documentRef}'`,
              `${error.documentType}-${error.code}`,
              error
            )
          );
      }

      return res
        .status(400)
        .json(
          errorResponse(
            `'${error.documentType}' ${error.code} at ref '${error.documentRef}'`,
            `${error.documentType}-${error.code}`,
            error
          )
        );

    default:
      // Throw a generic error response for unknown errors
      return res
        .status(500)
        .json(errorResponse("An unknown error occurred.", "unknown", error));
  }
};
