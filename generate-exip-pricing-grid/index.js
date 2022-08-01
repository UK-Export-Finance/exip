const args = require('minimist')(process.argv.slice(2));
const xlsx = require('node-xlsx');
const fs = require('fs');

const { spreadsheet, outputDirectory } = args;

const getWorkSheets = () => {
  console.info('getting worksheets');

  const workSheetsFromFile = xlsx.parse(spreadsheet);

  const sheets = {
    multiPolicy: workSheetsFromFile[2],
    singlePolicy: workSheetsFromFile[3],
  };

  return sheets;
};

const getCellPercentString = (index) => {
  if (index === 2) {
    return '70percent';
  }

  if (index === 3) {
    return '75percent';
  }

  if (index === 4) {
    return '80percent';
  }

  if (index === 5) {
    return '85percent';
  }

  if (index === 6) {
    return '90percent';
  }

  if (index === 7) {
    return '95percent';
  }

  return null;
};

const createEmptyGrid = () => {
  console.info('creating empty grid');

  const emptyGrid = {
    'Single Policy': {
      'Standard Risk': [],
      'High Risk': [],
      'Very High Risk': [],
    },
    'Multi Policy': {
      'Standard Risk': [],
      'High Risk': [],
      'Very High Risk': [],
    },
  };

  return emptyGrid;
};

const mapRow = (row) => {
  const cleanRow = {
    months: row[1],
  };

  row.forEach((cell, index) => {
    if (index > 1) {

      const propertyName = getCellPercentString(index);

      cleanRow[propertyName] = Number((cell * 100).toFixed(2));
    }
  });

  return cleanRow;
};

const addRowToGrid = (GRID, row, policyType, riskCategory) => {
  if (riskCategory === 'Standard Risk') {
    GRID[policyType][riskCategory].push(row);
  } else if (riskCategory === 'High Risk') {
    GRID[policyType][riskCategory].push(row);
  } else if (riskCategory === 'Very High Risk') {
    GRID[policyType][riskCategory].push(row);
  }

  return GRID;
};

const addPolicyToGrid = (GRID, policyType, rows) => {
  console.info(`adding ${policyType} to the grid`);

  let updatedGrid;

  rows.forEach((row) => {
    const cleanRow = mapRow(row);
    const riskCategory = row[0];

    updatedGrid = addRowToGrid(GRID, cleanRow, policyType, riskCategory);
  });

  return updatedGrid;
};

const createJson = (gridData) => {
  console.info('creating JSON file');

  const stringified = JSON.stringify(gridData);

  fs.writeFileSync(`${outputDirectory}/pricing-grid.json`, stringified);
  console.info('JSON file written successfully');
};

const run = () => {
  const sheets = getWorkSheets();
  let grid = createEmptyGrid();

  grid = addPolicyToGrid(grid, 'Multi Policy', sheets.multiPolicy.data);
  grid = addPolicyToGrid(grid, 'Single Policy', sheets.singlePolicy.data);

  createJson(grid);
};

run();
