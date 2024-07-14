//'use strict'

const apiPath = process.env.API_ROOT;

exports.registerScoreboardRoutes = (app, apiPath) => {
    const rootPathForModule = `${ apiPath }/scoreboard`

    app.use(`${ rootPathForModule }`, require('./scoreboardRoute'));
}

