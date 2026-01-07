import { apiError } from "../utils/apiError.js";

export const authorizeRoles = (...roles) => {
  return (req, _, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new apiError(403, "Access denied");
    }
    next();
  };
};
