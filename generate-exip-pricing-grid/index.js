const args = require('minimist')(process.argv.slice(2));
const xlsx = require('node-xlsx');
const fs = require('fs');
const { PERCENTAGE_FIELDS, RISK, RISK_FIELDS } = require('./constants');

const { spreadsheet, outputDirectory } = args;

/**
 * getWorkSheets
 * Get Single and Multi policy sheets from spreadsheet (sheets 3 and 4).
 * @returns {Object} multiPolicy and singlePolicy from 
 */
const getWorkSheets = () => {
  console.info('getting worksheets');

  const workSheetsFromFile = xlsx.parse(spreadsheet);

  const sheets = {
    multiPolicy: workSheetsFromFile[2],
    singlePolicy: workSheetsFromFile[3],
  };

  return sheets;
};

/**
 * getCellPercentString
 * index 2 is "70%" in the spreadsheet. Index 3 is "75%" and so on.a
 * @returns {String} '70percent', '75percent' etc
 */
const getCellPercentString = (index) => {
  if (index === 2) {
    return PERCENTAGE_FIELDS['70'];
  }

  if (index === 3) {
    return PERCENTAGE_FIELDS['75'];
  }

  if (index === 4) {
    return PERCENTAGE_FIELDS['80'];
  }

  if (index === 5) {
    return PERCENTAGE_FIELDS['85'];
  }

  if (index === 6) {
    return PERCENTAGE_FIELDS['90'];
  }

  if (index === 7) {
    return PERCENTAGE_FIELDS['95'];
  }

  return null;
};

/**
 * createEmptyGrid
 * @returns {Object}
 */
const createEmptyGrid = () => {
  console.info('creating empty grid');

  const emptyGrid = {
    SINGLE_POLICY: {
      [RISK_FIELDS.STANDARD]: [],
      [RISK_FIELDS.HIGH]: [],
      [RISK_FIELDS.VERY_HIGH]: [],
    },
    MULTI_POLICY: {
      [RISK_FIELDS.STANDARD]: [],
      [RISK_FIELDS.HIGH]: [],
      [RISK_FIELDS.VERY_HIGH]: [],
    },
  };

  return emptyGrid;
};

/**
 * mapRow
 * Map each column in a row.
 * @param {Array} Array of objects (cells in a row).
 * @returns {Array}
 */
const mapRow = (row) => {
  const cleanRow = {
    months: row[1],
  };

  row.forEach((cell, index) => {
    if (index > 1) {
      const propertyName = getCellPercentString(index);

      // Spreadsheet percentages are formatted with additional 0's.
      // Therefore, multiply by 100 and use toFixed
      // To transform into the correct javascript format.
      cleanRow[propertyName] = Number((cell * 100).toFixed(2));
    }
  });

  return cleanRow;
};

/**
 * mapRiskCategory
 * Map a risk category in the spreadsheet to the risk name in the grid.
 * @param {String} Risk category from spreadsheet, e.g "Standard Risk"
 * @returns {String} Risk category in the grid, e.g "STANDARD"
 */
const mapRiskCategory = (riskCategory) =>{
  if (riskCategory === RISK.STANDARD) {
    return RISK_FIELDS.STANDARD;
  }

  if (riskCategory === RISK.HIGH) {
    return RISK_FIELDS.HIGH;
  }

  if (riskCategory === RISK.VERY_HIGH) {
    return RISK_FIELDS.VERY_HIGH;
  }

  return null;
}

/**
 * addRowToGrid
 * add a single row to the pricing grid.
 * @param {Object} Pricing grid
 * @param {Array} The row to add
 * @param {String} Policy type
 * @param {String} Risk category
 * @returns {Object} Updated pricing grid
 */
const addRowToGrid = (grid, row, policyType, riskCategory) => {
  if (riskCategory === RISK_FIELDS.STANDARD) {
    grid[policyType][riskCategory].push(row);
  } else if (riskCategory === RISK_FIELDS.HIGH) {
    grid[policyType][riskCategory].push(row);
  } else if (riskCategory === RISK_FIELDS.VERY_HIGH) {
    grid[policyType][riskCategory].push(row);
  }

  return grid;
};

/**
 * addPolicyToGrid
 * Map over every row for a policy and add to the grid
 * @param {Object} Pricing grid
 * @param {String} Policy type
 * @param {String} All rows for the policy type (all risk categories and associated data)
 * @returns {Object} Updated pricing grid
 */
const addPolicyToGrid = (grid, policyType, rows) => {
  console.info(`adding ${policyType} to the grid`);

  let updatedGrid;

  rows.forEach((row) => {
    const cleanRow = mapRow(row);
    const riskCategory = mapRiskCategory(row[0]);

    updatedGrid = addRowToGrid(grid, cleanRow, policyType, riskCategory);
  });

  return updatedGrid;
};

/**
 * createJson
 * Create a JSON file from the provided data.
 * @param {Object} Pricing grid
 */
const createJson = (data) => {
  console.info('creating JSON file');

  const stringified = JSON.stringify(data);

  fs.writeFileSync(`${outputDirectory}/pricing-grid.json`, stringified);
  console.info('JSON file written successfully');
};

/**
 * run
 * Executes everything.
 * - Get work sheeets
 * - Create empty pricing grid
 * - Map and add all policy types to the create
 * - Create a JSON file.
 */
const run = () => {
  const sheets = getWorkSheets();
  let grid = createEmptyGrid();

  grid = addPolicyToGrid(grid, 'MULTI_POLICY', sheets.multiPolicy.data);
  grid = addPolicyToGrid(grid, 'SINGLE_POLICY', sheets.singlePolicy.data);

  createJson(grid);
};

run();
