const os = require('os')
const path = require('path')
const cluster = require('cluster')
const mongoose = require('mongoose')
const { createRouter } = require('express-file-routing')

const services = require('./services')
const createService = require('./util/create-&-init-service')

const DB_URI = process.env.DB_URI

const startServices = () => {
    services
        .forEach(({
            name,
            routeDir,
            port
        }) => {

            if (mongoose.connection.readyState === 1) {
                console.log(`${ process.pid } - ${ name } :: Connected to database`)

                const newService = createService()
                createRouter(newService, {
                    directory: path.join(__dirname, 'routes', routeDir),
                })

                newService
                    .listen(port, err => {
                        if (err)
                            throw err
                        else
                            console.log(`${ process.pid } - ${ name } :: Service Started`)
                    })

            }
        })
}

mongoose
    .connect(DB_URI)
    .then(() => {
        if (os.cpus().length > 1)
            if (cluster.isMaster) {
                os
                    .cpus()
                    .forEach(() => cluster.fork())

                cluster
                    .on(
                        'exit',
                        async (worker, code, signal) => {
                            if (code !== 0 && !worker.exitedAfterDisconnect) {
                                if (mongoose.connection.readyState === 1)
                                    await mongoose.disconnect()
                                cluster.fork()
                            }
                        }
                    )
            }
            else startServices()
        else startServices()
    })
    .catch(err => { throw err })