module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://jsonplaceholder.typicode.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            '/user':{
                target:'http://localhost:8081',
                changeOrigin:true,
                pathRewrite:{
                }
            },
            '/cooper':{
                target:'http://localhost:8081',
                changeOrigin:true,
                pathRewrite:{
                }
            }
        }
    }
}