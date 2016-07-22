'use strict';

const createCheck = prop => (params, handler) => (req, res, next) => {
    const target = prop
        ? req[prop]
        : req;
    const passed = Object.keys(params).every(paramName => {
        const value = params[paramName];

        if (value === true) {
            return paramName in target;
        } else if (value === false) {
            return !(paramName in target);
        } else {
            return value === target[paramName];
        }
    });

    if (!passed) {
        next();
    } else {
        handler(req, res, next);
    }
};

module.exports = {
    query: createCheck('query'),
    req: createCheck(),
    headers: createCheck('headers'),
    cookies: createCheck('cookies'),
    session: createCheck('session')
};
