/**
 * mapChild
 * Map a child keystone document object
 * Calls itself if the child has children
 * @param {Object} Keystone RTE document data
 * @returns {Array | Object} Flattened child array or child object
 */
const mapChild = (child) => {
  if (child.children) {
    return child.children.map((c) => mapChild(c)).flat();
  }

  return child;
};

/**
 * flattenKeystoneDocument
 * Map keystone document data into a flattened array
 * This is dynamic and can handle unlimited nested data
 * @param {Array} Keystone RTE document data
 * @returns {Array} Flattened array
 */
const flattenKeystoneDocument = (content) => content.map((child) => mapChild(child)).flat();

export default flattenKeystoneDocument;
