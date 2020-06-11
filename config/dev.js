const dbname = process.env.NODE_ENV === 'production' ? 'morvec' : 'dev';

module.exports={
    googleClientID:'279896299448-l9js5jdbj05dum6ltiuh3uu2bb72hmfn.apps.googleusercontent.com',
    googleClientSecret:'70BhXXx3GiYgwD9Ucy9e7jJC',
    mongoURI:'mongodb+srv://rohith:rohith@mvcomcluster-rqhsh.mongodb.net/'+dbname+'?retryWrites=true&w=majority',
    cookieKey:'asdf',
    FACEBOOK_APP_ID:process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET:process.env.FACEBOOK_APP_SECRET
}