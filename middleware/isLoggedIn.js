// middleware/isLoggedIn.js

const isLoggedIn = (req, res, next) => {
  // Passport adds a `user` property to the request object if the user is authenticated
  if (req.isAuthenticated()) {
    // If user is authenticated, proceed to the next middleware
    return next();
  }
  
  // If user is not authenticated, return an error response
  return res.status(401).json({ message: 'Unauthorized' });
};

module.exports = isLoggedIn;