//'use strict'

const apiPath = process.env.API_ROOT;

exports.registerPuzzleRoutes = (app, apiPath) => {
    const rootPathForModule = `${ apiPath }/puzzle`

    app.use(`${ rootPathForModule }`, require('./puzzleRoute'));
}

