const gstCheckSumValidationHelper = g => {
  let a = 65,
    b = 55,
    c = 36;
  return Array.from(g).reduce((i, j, k, g) => {
    p =
      (p =
        (j.charCodeAt(0) < a ? parseInt(j) : j.charCodeAt(0) - b) *
        ((k % 2) + 1)) > c
        ? 1 + (p - c)
        : p;
    return k < 14
      ? i + p
      : j === ((c = c - (i % c)) < 10 ? c : String.fromCharCode(c + b));
  }, 0);
};

const gstCheckSumValidation = g => {
  return gstCheckSumValidationHelper(g) === true ? true : false;
};

export default gstCheckSumValidation;
