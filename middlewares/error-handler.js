module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof err == "string") {
        // custom application error
        return res.status(400).json({ message: err });
    }

    // mongoose validation error
    if (err.name === "ValidationError") {
        return res.status(400).json({
            errors: Object.keys(err.errors).reduce(function (errors, key) {
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }

    if (err.name === "UnauthorizedError") {
        // jwt authentication error
        return res.status(401).json({ message: "Unauthorized" });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}