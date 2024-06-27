type ObjectType = {
  [key: string]: any;
};

interface MapArrayOfConnectionObjectsParams {
  idsArray: Array<object>;
  relationshipName: string;
}

/**
 * mapArrayOfConnectionObjects
 * Map an array of "connect" relationships.
 * @param {Array<String>} idsArray: Array of IDs
 * @param {String} relationshipName: Name of the relationship to map.
 * @returns {Array<object>} Array of "connect" relationships.
 */
const mapArrayOfConnectionObjects = ({ idsArray, relationshipName }: MapArrayOfConnectionObjectsParams) => {
  const mapped = idsArray.map((obj: ObjectType) => ({
    [relationshipName]: {
      connect: {
        id: obj.id,
      },
    },
  }));

  return mapped;
};

export default mapArrayOfConnectionObjects;
