const auth = (req, res, next) => {
    const userId = req.headers['x-user-id'];

    if (!userId) {

        return res.status(401).json({ message: "Invalid UserId" });
    }
    req.userId = Number(userId);
    if (isNaN(req.userId)) {
        return res.status(401).json({ message: "Invalid UserId" });
    }
    next();
}

module.exports = auth;