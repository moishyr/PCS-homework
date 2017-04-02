'use strict';

function basicAuth(options) {
    
    function fail(res) {
        res.statusCode = 401;
        res.setHeader('WWW-Authenticate', 'Basic realm=' + options.realm);
        res.end();
    }

    return function (req, res, next) {
        const auth = req.headers.authorization;
        if (!auth) {
            fail(res);
        }
        let tmp = auth.split(' ');
        const buffer = new Buffer(tmp[1], 'base64');
        tmp = buffer.toString();

        let credentials = tmp.split(':');
        if (options.accounts[credentials[0]] === credentials[1]) {
            req.user = credentials[0];
            next();
        } else {
            fail(res);
        }
    };
}

module.exports = basicAuth;