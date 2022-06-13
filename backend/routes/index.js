const blogRouter = require('./blog');
const providersRouter = require('./providers');

blogRouter = require('./blog');
providersRouter = require('./providers');

const setupRoutes = (app) => {
  // User routes
  // TODO add missing Routes like e.g. api/auth
  app('api/blog', blogRouter);
  app('api/providers', providersRouter); 
};

module.exports = {
  setupRoutes,
};

