export interface XLSXTitleRowIndexes {
  HEADER: number;
  KEY_INFORMATION: number;
  EXPORTER_CONTACT_DETAILS?: number;
  POLICY: number;
  EXPORTER_BUSINESS: number;
  BUYER: number;
  ELIGIBILITY: number;
}

export interface XLSXRowIndexes {
  TITLES: XLSXTitleRowIndexes;
  COMPANY_ADDRESS: number;
  COMPANY_SIC_CODES: number;
  BROKER_ADDRESS: number;
  BUYER_ADDRESS: number;
  BUYER_CONTACT_DETAILS: number;
}
