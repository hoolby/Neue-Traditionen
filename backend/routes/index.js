const blogRouter = require('./blog');
const providersRouter = require('./providers');
const authRouter = require('./auth');
const contactRouter = require('./contact');


const setupRoutes = (app) => {
  // User routes
  app('api/auth', authRouter);
  app('api/blog', blogRouter);
  app('api/providers', providersRouter); 
  app('api/contact', contactRouter);
};

module.exports = {
  setupRoutes,
};

