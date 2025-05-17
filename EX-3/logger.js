// logger.js - Logging Middleware
const logger = (req, res, next) => {
    const { method, path, query } = req;
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] ${method} ${path} | Query:`, query);

    next();
};

export default logger;
