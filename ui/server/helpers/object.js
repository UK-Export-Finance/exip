const objectHasValues = (obj) => {
  if (obj && Object.keys(obj).length > 0) {
    return true;
  }

  return false;
};

const objectHasProperty = (obj, property) => {
  if (obj[property]) {
    return true;
  }

  return false;
};

module.exports = {
  objectHasValues,
  objectHasProperty,
};
