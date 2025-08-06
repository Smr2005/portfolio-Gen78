const JWT = require("jsonwebtoken");
require("dotenv").config();

const creatError = require("http-errors");

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET || "39832173821";
            const options = {
                expiresIn: "2h",
                issuer: "portfolio_generator",
                audience: userId,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    reject(creatError.InternalServerError());
                    return;
                }
                resolve(token);
            });
        });
    },
    //accessing private routes

    verifyAccessToken: (req, res, next) => {
        // Check for token in Authorization header or x-access-token header
        let token = null;
        
        if (req.headers["authorization"]) {
            const authHeader = req.headers["authorization"];
            const bearerToken = authHeader.split(" ");
            token = bearerToken[1];
        } else if (req.headers["x-access-token"]) {
            token = req.headers["x-access-token"];
        }
        
        if (!token) {
            return next(creatError.Unauthorized("No token provided"));
        }
        
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET || "39832173821", (err, payload) => {
            if (err) {
                console.error("JWT verification error:", err);
                const message =
                    err.name === "JsonWebTokenError" ? "Invalid token" : err.message;
                return next(creatError.Unauthorized(message));
            }
            req.payload = payload;
            next();
        });
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET || "2eiwioadpsaT";
            const options = {
                expiresIn: "1y",
                issuer: "portfolio",
                audience: userId,
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message);
                    // reject(err)
                    reject(creatError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyRefreshToken: (refreshToken) => {
        return new Promise((resolve, reject) => {
            JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || "2eiwioadpsaT", (err, payload) => {
                if (err) return reject(creatError.Unauthorized());

                const userId = payload.aud;

                resolve(userId);
            });
        });
    },
};