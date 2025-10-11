const fs = require("fs");

function logReqRes(fileName) {
  return (req, res, next) => {
    //closure
    fs.appendFile(
      fileName,
      ` \n ${new Date().toISOString()} ::  ${req.url} : ${req.ip}  \n`,
      (err, data) => {
        next();
      }
    );
  };
}
module.exports = {
  logReqRes,
};
