const { environment } = require('@rails/webpacker')
const { VueLoaderPlugin } = require('vue-loader')
const vue = require('./loaders/vue')
const customConfig = require('./custom');
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
 environment.config.merge(performance );
 environment.config.merge(customConfig);
environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())
environment.loaders.prepend('vue', vue)
module.exports = environment

