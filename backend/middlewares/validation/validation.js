import createError from "http-errors";

//====================================================================
// Validation middleware for required fields
//====================================================================
/**
 * Validation middleware for required fields
 * @param {string[]} requiredFields - Array of required field names
 * @returns {Function} Express middleware function
 */
export const validateRequiredFields = (requiredFields) => {
  return (req, res, next) => {
    const missingFields = [];
    
    for (const field of requiredFields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      return next(createError(400, `Missing required fields: ${missingFields.join(', ')}`));
    }
    
    next();
  };
};


//====================================================================
// Validation middleware for email format
//====================================================================

export const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return next(createError(400, 'Invalid email format'));
    }
  }
  
  next();
};


//====================================================================
// Validation middleware for password strength
//====================================================================

export const validatePassword = (req, res, next) => {
  const { password } = req.body;
  
  if (password) {
    if (password.length < 6) {
      return next(createError(400, 'Password must be at least 6 characters long'));
    }
    
    // Optional:  more password requirements
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (!passwordRegex.test(password)) {
      return next(createError(400, 'Password must contain uppercase, lowercase, number and special character'));
    }
  }
  
  next();
};


//====================================================================
//Validation middleware for MongoDB ObjectId
//====================================================================

export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return next(createError(400, `Invalid ${paramName} format`));
    }
    
    next();
  };
};
