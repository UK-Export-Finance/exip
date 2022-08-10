type Object = {
  [key: string]: any;
}

const objectHasValues = (obj: Object) => {
  if (obj && Object.keys(obj).length > 0) {
    return true;
  }

  return false;
};

const objectHasProperty = (obj: Object, propertyName: string) => {
  if (obj[propertyName]) {
    return true;
  }

  return false;
};

export {
  objectHasValues,
  objectHasProperty,
};
