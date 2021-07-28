exports.tryCatch = (fn) => {
    return function () {
        try {
            fn(req, res, next);
        } catch {
            console.log('error try catch');
        }
    };
};
