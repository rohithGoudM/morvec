// const dbname = process.env.NODE_ENV === 'production' ? 'morvec' : 'dev';
const dbname = process.env.NODE_ENV === 'production' ? 'morvec' : 'morvec';

const mongoURI = 'mongodb://rohith:rohith@mvcomcluster-shard-00-00.rqhsh.mongodb.net:27017,mvcomcluster-shard-00-01.rqhsh.mongodb.net:27017,mvcomcluster-shard-00-02.rqhsh.mongodb.net:27017/'+dbname+'?ssl=true&replicaSet=MvcomCluster-shard-0&authSource=admin&retryWrites=true&w=majority';

module.exports={
    googleClientID:'279896299448-l9js5jdbj05dum6ltiuh3uu2bb72hmfn.apps.googleusercontent.com',
    // googleClientID:'279896299448-pcmm9ocusqaqbgt15etuofn5qhkiv3cc.apps.googleusercontent.com',
    // googleClientSecret:'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',
    googleClientSecret:'70BhXXx3GiYgwD9Ucy9e7jJC',
    mongoURI:mongoURI,
    // apiKey:'b36aa754',
    apiKey:'5e67a871',
    cookieKey:'asdf',
    FACEBOOK_APP_ID:process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET:process.env.FACEBOOK_APP_SECRET
}