const fs = require('fs')
const crypto = require('crypto')

const configs = require('./glue.config.js')
const package = require('./package.json')

const hashPackageName = crypto.createHash('md5').update(package.name).digest('hex');

const exitHandler = () => {
    configs.forEach(config => {
        const { filename } = config
        fs.unlinkSync(`${__dirname}/${filename}`)
    })
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);
process.on('uncaughtException', exitHandler);

module.exports = () => {
    configs.forEach(config => {
        const { filename, content } = config

        fs.mkdirSync(`/tmp/${hashPackageName}`, { recursive: true })
        fs.writeFileSync(`/tmp/${hashPackageName}/${filename}`, content)
        fs.symlinkSync(`/tmp/${hashPackageName}/${filename}`, `${__dirname}/${id}`)

    })
}