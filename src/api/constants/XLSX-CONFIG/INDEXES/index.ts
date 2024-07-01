import SECTION_NAMES from '../SECTION_NAMES';
// import { Application, XLSXTitleRowIndexes, XLSXRowIndexes } from '../../../types';
import { Application } from '../../../types';

const {
  EXPORTER_BUSINESS,
  POLICY,
  BUYER,
  EXPORT_CONTRACT,
  DECLARATIONS,
} = SECTION_NAMES;

// /**
//  * TITLE_INDEXES
//  * All XLSX title indexes.
//  * @returns {Object}
//  */
// export const TITLE_INDEXES = () =>
//   ({
//     HEADER: 1,
//     EXPORTER_CONTACT_DETAILS: 9,
//     KEY_INFORMATION: 15,
//     ELIGIBILITY: 21,
//     EXPORTER_BUSINESS: 31,
//     POLICY: 47,
//     BUYER: 60,
//     EXPORT_CONTRACT: 69,
//     DECLARATIONS: 75,
//   }) as XLSXTitleRowIndexes;

// /**
//  * INDEXES
//  * All XLSX indexes.
//  * @returns {Object}
//  */
// export const INDEXES = () =>
//   ({
//     TITLES: TITLE_INDEXES(),
//     COMPANY_ADDRESS: 33,
//     COMPANY_SIC_CODES: 34,
//     BROKER_ADDRESS: 59,
//     BUYER_ADDRESS: 62,
//     LOSS_PAYEE_ADDRESS: 63,
//     AGENT_ADDRESS: 0,
//   }) as XLSXRowIndexes;

export const NEW_XLSX_ROW_INDEXES = {
  [EXPORTER_BUSINESS]: (application: Application) => {
    const {
      company: {
        differentTradingAddress: { fullAddress: hasDifferentTradingAddress },
        hasDifferentTradingName,
      },
    } = application;

    const INDEXES = {
      REGISTERED_OFFICE_ADDRESS: 3,
      COMPANY_SIC_CODES: 4,
      ALTERNATIVE_TRADING_ADDRESS: 0,
    };

    if (hasDifferentTradingAddress) {
      INDEXES.ALTERNATIVE_TRADING_ADDRESS = 7;
    }

    if (hasDifferentTradingName && hasDifferentTradingAddress) {
      INDEXES.ALTERNATIVE_TRADING_ADDRESS += 1;
    }

    return INDEXES;
  },
  [POLICY]: (application: Application) => {
    return {};
  },
  [BUYER]: (application: Application) => {
    return {};
  },
  [EXPORT_CONTRACT]: (application: Application) => {
    return {};
  },
  [DECLARATIONS]: (application: Application) => {
    return {};
  },
};
