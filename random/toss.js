module.exports = (req, res, next) => {
    req.coin = Math.random() > 0.5 ? "head" : "tail";
    next()
}