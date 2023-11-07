const args = require('minimist')(process.argv.slice(2));
const xlsx = require('node-xlsx');
const fs = require('fs');
const { RISK, RISK_FIELDS } = require('./constants');

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
    singlePolicy: workSheetsFromFile[0],
    multiPolicy: workSheetsFromFile[1],
  };

  return sheets;
};

/**
 * getPercentage
 * index 2 is "70%" in the spreadsheet. Index 3 is "75%" and so on.
 * @returns {Number} 70, 75, 80 etc.
 */
const getPercentage = (index) => {
  if (index === 2) {
    return 70;
  }

  if (index === 3) {
    return 75;
  }

  if (index === 4) {
    return 80;
  }

  if (index === 5) {
    return 85;
  }

  if (index === 6) {
    return 90;
  }

  if (index === 7) {
    return 95;
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
    MULTIPLE_POLICY: {
      [RISK_FIELDS.STANDARD]: [],
      [RISK_FIELDS.HIGH]: [],
      [RISK_FIELDS.VERY_HIGH]: [],
    },
  };

  return emptyGrid;
};

/**
 * mapRowRates
 * Map each rate in a row, transform into an object.
 * @param {Array} Array of objects (cells in a row).
 * @returns {Array} e.g [ { insuredFor: 85, premiumRate: 1.3} ]
 */
const mapRowRates = (row) => {
  const cleanRowRates = [];

  const rowRates = [
    {
      rate: row[2],
      cellIndex: 2,
    },
    {
      rate: row[3],
      cellIndex: 3,
    },
    {
      rate: row[4],
      cellIndex: 4,
    },
    {
      rate: row[5],
      cellIndex: 5,
    },
    {
      rate: row[6],
      cellIndex: 6,
    },
    {
      rate: row[7],
      cellIndex: 7,
    },
  ];

  rowRates.forEach((cell) => {
    const percentage = getPercentage(cell.cellIndex);

    const insuredFor = percentage;

    // Spreadsheet percentages are formatted with additional 0's.
    // Therefore, multiply by 100 and use toFixed
    // To transform into the correct javascript format.
    const premiumRate = Number((cell.rate * 100).toFixed(2));

    cleanRowRates.push({
      insuredFor,
      premiumRate,
    });
  });

  return cleanRowRates;
};

/**
 * mapRiskCategory
 * Map a risk category in the spreadsheet to the risk name in the grid.
 * @param {String} Risk category from spreadsheet, e.g "Standard Risk"
 * @returns {String} Risk category in the grid, e.g "STANDARD"
 */
const mapRiskCategory = (riskCategory) => {
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
};

/**
 * addRowToGrid
 * add a single row to the pricing grid.
 * @param {Object} Pricing grid
 * @param {Number} Months of cover for the row
 * @param {Array} The rates to add
 * @param {String} Policy type
 * @param {String} Risk category
 * @returns {Object} Updated pricing grid
 */
const addRowToGrid = (grid, months, rates, policyType, riskCategory) => {
  grid[policyType][riskCategory].push({
    months,
    rates,
  });

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
    if (row.length) {
      const months = Number(row[1]);

      const rates = mapRowRates(row);
      const riskCategory = mapRiskCategory(row[0]);

      updatedGrid = addRowToGrid(grid, months, rates, policyType, riskCategory);
    }
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
 * - Get work sheets
 * - Create empty pricing grid
 * - Map and add all policy types to the create
 * - Create a JSON file.
 */
const run = () => {
  const sheets = getWorkSheets();
  let grid = createEmptyGrid();

  grid = addPolicyToGrid(grid, 'MULTIPLE_POLICY', sheets.multiPolicy.data);
  grid = addPolicyToGrid(grid, 'SINGLE_POLICY', sheets.singlePolicy.data);

  createJson(grid);
};

run();
