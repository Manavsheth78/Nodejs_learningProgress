// function add(a, b) {
//   return a + b;
// }

// function sub2(a, b) {
//   return a - b;
// }

// module.exports = { addFn: add, subFn: sub2 };

//-------------------------------------

// Another way of writing the same code single exports
exports.add = function add(a, b) {
  return a + b;
};

exports.sub = function sub2(a, b) {
  return a - b;
};
// module.exports = { addFn: add, subFn: sub2 };

exports.add1 = (a, b) => a + b;
exports.sub1 = (a, b) => a - b;
