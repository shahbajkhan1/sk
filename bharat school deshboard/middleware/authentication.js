import jwt from "jsonwebtoken";
export const authentication = (req, res, next) => {
    try {
        if (!req.session.token) {
            res.status(407).send({
                status: false,
                msg: "Auth token is required.",
                data: {}
            });
            return;
        }

        var checkToken = jwt.verify(req.session.token, "tokentoken");
        if (checkToken) {
            next();
            return;
        } else {
            res.status(401).send({
                status: false,
                msg: "Auth token is not valid.",
                data: {}
            });
            return;
        }
    } catch (err) {
        res.status(401).send({
            status: false,
            msg: "Invalid token",
            data: {}
        })
        return;
    }
};