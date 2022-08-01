# Generate EXIP pricing grid

This script reads the pricing grid XLSX spreadsheet and transforms it to JSON.

## How to use

1. Check and modify the spreadsheet:

    * Ensure that the sheets are in the correct order:
      * "Revolving Policy - Digital" should be the 3rd sheet.
      * "Single Policy - Digital" should be the 4th sheet.
    * Remove all intro text from both sheets.
    * Copy all table cells, starting from the body and paste into the first row, first cell of the spreadsheet.
    * Copy the first cell (risk category) and paste this into each appropriate column, so each section has the risk category as the first cell.
    * The spreadsheet should now look like the example below.

2. Install dependencies:

  ```cmd
  npm install
  ```

3. Run the script by passing the spreadsheet location and save directory arguments:

  ```cmd
  node index.js --spreadsheet=./path/to/spreadsheet.xlsx --outputDirectory=./path/to/save
  ```

A JSON file will be generated in the root, called `pricing-grid.json`

## Expected spreadsheet format

Note that all examples do not use real data. In production, the premium rates are different and there are many more months of cover for each risk category.

|                    |        |           |           |           |           |           |           |
| ------------------ | ------ | --------- | --------- | --------- | --------- | --------- | --------- |
| Standard Risk      | 2      | 0.5%      | 0.6%      | 0.7%      | 0.8%      | 0.9%      | 0.10%     |
| Standard Risk      | 3      | 0.6%      | 0.7%      | 0.8%      | 0.9%      | 0.10%     | 0.11%     |
| Standard Risk      | 4      | 0.7%      | 0.8%      | 0.9%      | 0.10%     | 0.11%     | 0.12%     |
| High Risk          | 2      | 1.1%      | 1.2%      | 1.3%      | 1.4%      | 1.5%      | 1.6%      |
| High Risk          | 3      | 1.2%      | 1.3%      | 1.4%      | 1.5%      | 1.6%      | 1.7%      |
| High Risk          | 4      | 1.3%      | 1.4%      | 1.5%      | 1.6%      | 1.7%      | 1.8%      |
| Very High Risk     | 2      | 2.1%      | 2.2%      | 2.3%      | 2.4%      | 2.5%      | 2.6%      |
| Very High Risk     | 3      | 3.2%      | 3.3%      | 3.4%      | 3.5%      | 3.6%      | 3.7%      |
| Very High Risk     | 4      | 4.3%      | 4.4%      | 4.5%      | 4.6%      | 4.7%      | 4.8%      |

Example with table headings (to explain what the columns are).

:warning: The table headings should not be there. The result should be a pure table body.

| Risk category      | Months | 70% cover | 75% cover | 80% cover | 85% cover | 90% cover | 95% cover |
| ------------------ | ------ | --------- | --------- | --------- | --------- | --------- | --------- |
| Standard Risk      | 2      | 0.5%      | 0.6%      | 0.7%      | 0.8%      | 0.9%      | 0.10%     |
| Standard Risk      | 3      | 0.6%      | 0.7%      | 0.8%      | 0.9%      | 0.10%     | 0.11%     |
| Standard Risk      | 4      | 0.7%      | 0.8%      | 0.9%      | 0.10%     | 0.11%     | 0.12%     |
| High Risk          | 2      | 1.1%      | 1.2%      | 1.3%      | 1.4%      | 1.5%      | 1.6%      |
| High Risk          | 3      | 1.2%      | 1.3%      | 1.4%      | 1.5%      | 1.6%      | 1.7%      |
| High Risk          | 4      | 1.3%      | 1.4%      | 1.5%      | 1.6%      | 1.7%      | 1.8%      |
| Very High Risk     | 2      | 2.1%      | 2.2%      | 2.3%      | 2.4%      | 2.5%      | 2.6%      |
| Very High Risk     | 3      | 3.2%      | 3.3%      | 3.4%      | 3.5%      | 3.6%      | 3.7%      |
| Very High Risk     | 4      | 4.3%      | 4.4%      | 4.5%      | 4.6%      | 4.7%      | 4.8%      |

## JSON result

This is just an example with a very small amount of months.

```json
{
  "SINGLE_POLICY": {
    "STANDARD": [
      {
        "months":  2,
        "70percent": 0.5,
        "75percent": 0.6,
        "80percent": 0.7,
        "85percent": 0.8,
        "90percent": 0.9,
        "95percent": 0.10
      },
      {
        "months":  3,
        "70percent": 0.6,
        "75percent": 0.7,
        "80percent": 0.8,
        "85percent": 0.9,
        "90percent": 0.10,
        "95percent": 0.11
      }
    ],
    "HIGH": [
      {
        "months":  2,
        "70percent": 1.1,
        "75percent": 1.2,
        "80percent": 1.3,
        "85percent": 1.4,
        "90percent": 1.5,
        "95percent": 1.6
      }
    ],
    "VERY_HIGH": [
      {
        "months":  2,
        "70percent": 2.1,
        "75percent": 2.2,
        "80percent": 2.3,
        "85percent": 2.4,
        "90percent": 2.5,
        "95percent": 2.6
      }
    ],  
  }
  "MULTI_POLICY": {
    "STANDARD": [],
    "HIGH": [],
    "VERY_HIGH": [],  
  }
}
```
