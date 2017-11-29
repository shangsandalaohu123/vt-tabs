var path = require('path')
var webpack = require('webpack')
module.exports = {
    port: 9090,
    webpack: {
        resolve: {
            alias: {
                'vt-tabs': path.resolve(__dirname, 'src')
            }
        }
    },
    md: { dir: './' },
    vue: { dir: './docs' }
}