'use strict';

const createCondition = prop => (params, handler) => (req, res, next) => {
    const target = prop
        ? req[prop]
        : req;
    const passed = Object.keys(params).every(paramName => {
        const value = params[paramName];

        switch (value) {
            case true:
                return paramName in target;

            case false:
                return !(paramName in target);

            default:
                return value == target[paramName];
        }
    });

    if (!passed) {
        next();
    } else {
        handler(req, res, next);
    }
};

module.exports = {
    createCondition,
    req: createCondition(),
    cookies: createCondition('cookies'),
    headers: createCondition('headers'),
    params: createCondition('params'),
    query: createCondition('query'),
    session: createCondition('session')
};
