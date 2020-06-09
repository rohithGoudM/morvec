if(process.env.NODE_ENV === 'production'){
    module.exports = require('./dev') //prod
}else{
    module.exports = require('./dev')
}