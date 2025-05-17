// auth.js
const VALID_TOKEN = "xyz123";

const authenticate = (req, res, next) => {
    const token = req.query.token;

    if (!token || token !== VALID_TOKEN) {
        return res.status(401).json({ error: "Unauthorized: invalid or missing token" });
    }

    next();
};

export default authenticate;
