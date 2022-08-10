type ObjectType = {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
};

const objectHasValues = (obj: ObjectType) => {
  if (obj && Object.keys(obj).length > 0) {
    return true;
  }

  return false;
};

const objectHasProperty = (obj: ObjectType, propertyName: string) => {
  if (obj[propertyName]) {
    return true;
  }

  return false;
};

export { objectHasValues, objectHasProperty };
