import { XLSXTitleRowIndexes, XLSXRowIndexes } from '../../../types';

/**
 * TITLE_INDEXES
 * All XLSX title indexes.
 * @returns {Object}
 */
export const TITLE_INDEXES = () =>
  ({
    HEADER: 1,
    EXPORTER_CONTACT_DETAILS: 9,
    KEY_INFORMATION: 15,
    ELIGIBILITY: 21,
    EXPORTER_BUSINESS: 31,
    POLICY: 47,
    BUYER: 60,
    DECLARATIONS: 69,
  }) as XLSXTitleRowIndexes;

/**
 * INDEXES
 * All XLSX indexes.
 * @returns {Object}
 */
export const INDEXES = () =>
  ({
    TITLES: TITLE_INDEXES(),
    COMPANY_ADDRESS: 33,
    COMPANY_SIC_CODES: 34,
    BROKER_ADDRESS: 59,
    BUYER_ADDRESS: 62,
    LOSS_PAYEE_ADDRESS: 63,
  }) as XLSXRowIndexes;

/**
 * incrementIndexes
 * Increment some specific indexes.
 * Depending on the application, some additional fields could be submitted,
 * and additional XLSX rows will be rendered.
 * Therefore, we need to increment any affected XLSX row indexes.
 * @param {XLSXRowIndexes} indexes
 * @returns {XLSXRowIndexes} Modified indexes
 */
export const incrementIndexes = (indexes: XLSXRowIndexes) => {
  const modified = indexes;

  modified.BROKER_ADDRESS += 1;
  modified.BUYER_ADDRESS += 1;
  modified.LOSS_PAYEE_ADDRESS += 1;

  modified.TITLES.POLICY += 1;
  modified.TITLES.BUYER += 1;
  modified.TITLES.DECLARATIONS += 1;

  return modified;
};
