const _ = require("lodash");

const pickDataInfo = (object = {}, fields = []) => _.pick(object, fields);

module.exports = {
  pickDataInfo,
};
