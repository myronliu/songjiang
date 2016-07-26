var cleanUserCache= function() {
    document.cookie = 'auth="";path=/';
    // document.cookie = 'ssoToken="";path=/';
    document.cookie = 'account="";path=/';
    document.cookie = 'name="";path=/';
    document.cookie = 'token="";path=/';
}
module.exports = cleanUserCache;