const { environment } = require('@rails/webpacker')
const webpack = require('webpack') 
const performance = require('./maxsize')
 environment.plugins.append('Provide', 
   new webpack.ProvidePlugin({ 
     $: 'jquery/src/jquery',
     jQuery: 'jquery/src/jquery',
     Popper: ['popper.js', 'default'] ,
     L: 'leaflet',
     jsQR:'jsqr/dist/jsQR'
   }) 
 )
 environment.config.merge(performance )

module.exports = environment

