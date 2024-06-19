type ObjectType = {
  [key: string]: any;
};

interface mapArrayOfConnectionObjectsParams {
  idsArray: Array<object>
  relationshipName: string
}

const mapArrayOfConnectionObjects = ({ idsArray, relationshipName }: mapArrayOfConnectionObjectsParams) => {
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
