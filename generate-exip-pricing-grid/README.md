# Generate EXIP pricing grid

This script reads the pricing grid XLSX spreadsheet and transforms it to JSON.

## How to use

1. Check and modify the spreadsheet:

    * Ensure that the sheets are in the correct order:
      * "Single Policy - Digital" should be the 1st sheet.
      * "Revolving Policy - Digital" should be the 2nd sheet.
    * Remove all intro text from both sheets.
    * Copy all table cells, starting from the body and paste into the first row, first cell of the spreadsheet.
    * Copy the first cell (risk category) and paste this into each appropriate column, so each section has the risk category as the first cell.
      * For example, "Standard Risk (S)" should be "Standard Risk" and present on every single row of this section.
    * The spreadsheet should now look like the example below.

2. Install dependencies:

  ```cmd
  npm install
  ```

3. Run the script by passing the spreadsheet location and save directory arguments:

  ```cmd
  node index.js --spreadsheet=./path/to/spreadsheet.xlsx --outputDirectory=./path/to/save
  ```

A JSON file will be generated in the root, called `pricing-grid.json`.

4. Copy the new pricing grid JSON into the UI: [src/ui/server/generate-quote/pricing-grid.json](https://github.com/UK-Export-Finance/exip/tree/main-application/src/ui/server/generate-quote/pricing-grid.json)

The UI will then automatically consume this JSON.

5. Execute [quote E2E tests](https://github.com/UK-Export-Finance/exip/tree/main-application/e2e-tests/cypress/e2e/journeys/quote/your-quote) - more than likely that some assertions will need to be updated, because pricing has changed.



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
        "rates": [
          {
            "insuredFor": 70,
            "premiumRate": 0.5
          },
          {
            "insuredFor": 75,
            "premiumRate": 0.6
          },
          {
            "insuredFor": 80,
            "premiumRate": 0.7
          },
          {
            "insuredFor": 85,
            "premiumRate": 0.8
          },
          {
            "insuredFor": 90,
            "premiumRate": 0.9
          },
          {
            "insuredFor": 95,
            "premiumRate": 0.10
          }
        ]
      },
      {
        "months":  3,
        "rates": [
          {
            "insuredFor": 70,
            "premiumRate": 0.6
          },
          {
            "insuredFor": 75,
            "premiumRate": 0.7
          },
          {
            "insuredFor": 80,
            "premiumRate": 0.8
          },
          {
            "insuredFor": 85,
            "premiumRate": 0.9
          },
          {
            "insuredFor": 90,
            "premiumRate": 0.10
          },
          {
            "insuredFor": 95,
            "premiumRate": 0.11
          }
        ]
      }
    ],
    "HIGH": [
      {
        "months":  2,
        "rates": [
          {
            "insuredFor": 70,
            "premiumRate": 1.1
          },
          {
            "insuredFor": 75,
            "premiumRate": 1.2
          },
          {
            "insuredFor": 80,
            "premiumRate": 1.3
          },
          {
            "insuredFor": 85,
            "premiumRate": 1.4
          },
          {
            "insuredFor": 90,
            "premiumRate": 1.5
          },
          {
            "insuredFor": 95,
            "premiumRate": 1.6
          }
        ]
      }
    ],
    "VERY_HIGH": [
      {
        "months":  2,
        "rates": [
          {
            "insuredFor": 70,
            "premiumRate": 2.1
          },
          {
            "insuredFor": 75,
            "premiumRate": 2.2
          },
          {
            "insuredFor": 80,
            "premiumRate": 2.3
          },
          {
            "insuredFor": 85,
            "premiumRate": 2.4
          },
          {
            "insuredFor": 90,
            "premiumRate": 2.5
          },
          {
            "insuredFor": 95,
            "premiumRate": 2.6
          }
        ]
      }
    ],  
  },
  "MULTIPLE_POLICY": {
    "STANDARD": [],
    "HIGH": [],
    "VERY_HIGH": []
  }
}
```
---