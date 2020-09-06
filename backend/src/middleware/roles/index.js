import { handleApiError } from "../../helpers/apiResponse";
import { AuthenticationError } from "../../errors/auth";

// Check the token is teacher role
export const checkTeacherRole = (req, res, next) => {
  const { teacher, admin } = req.userRoles;

  if (teacher === true || admin === true) {
    return next();
  }
  return handleApiError(res, new AuthenticationError());
};

// Check the token is super user role
export const checkAdminRole = (req, res, next) => {
  const { teacher, admin } = req.userRoles;

  if (admin === true) {
    return next();
  }
  return handleApiError(res, new AuthenticationError());
};

// Remove all userRoles on the request to effectively
// demote the user for the single request made
export const stripRoles = (req, res, next) => {
  delete req.userRoles
  next()
}
