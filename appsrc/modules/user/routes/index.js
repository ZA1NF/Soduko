//'use strict'

const apiPath = process.env.API_ROOT;
// const securityModuleRoute = require('./securityModuleRoute');
// const securityRoleRoute = require('./securityRoleRoute');
// const securityConfigRoute = require('./securityConfigRoute');
// const securityAuthenticationRoute = require('./securityAuthenticationRoute');

const userRoute = require('./userRoute');


exports.registerUserRoutes = (app, apiPath) => {
    const rootPathForModule = `${apiPath}/user`

    // localhost://api/1.0.0/security/
    app.use(`${rootPathForModule}`, userRoute);


}