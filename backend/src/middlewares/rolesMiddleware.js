export const authorization = (role) => {
    return (req, res, next) => {
        if (!role.includes(req.headers.role)) {
            return res.status(403).json({
                message: "Forbidden: Unauthorized"
            });
        }
        next();
    }
}