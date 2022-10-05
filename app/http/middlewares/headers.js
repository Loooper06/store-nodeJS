exports.setHeaders = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credntials" , true);
    res.setHeader("Access-Control-Allow-Methods", "GET , POST , PUT , DELETE");
    res.setHeader("Access-Control-Allow-Hedaers", "Content-Type , Authorization");
    next();
}