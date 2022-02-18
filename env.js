const SET_ENV_VARIABLE = () => {

    //App setting or configuration
    process.env.PORT = 4000;
    
    //Datasbse setting
    process.env.DB_CONN_STRING = "mongodb://127.0.0.1:27017/nodetest" //"mongodb://127.0.0.1:27017/test-nodetest"

    //JWT SECRETS
    process.env.JWT_SECRET = "cq7r70w170r8qe07tc+9qr70cf9c7r9c077t8wc7rgx9ERERTUBY465U4564N6U467UVWV4TVET83BG645kHAHIYWU435adiF"

    //Sample JWT token for testing
    process.env.TOKEN= ""

}//End of SET_ENV_VARIABLE function.

module.exports = SET_ENV_VARIABLE();

