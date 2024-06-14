export interface XLSXTitleRowIndexes {
  HEADER: number;
  KEY_INFORMATION: number;
  EXPORTER_CONTACT_DETAILS?: number;
  POLICY: number;
  EXPORTER_BUSINESS: number;
  EXPORT_CONTRACT: number;
  BUYER: number;
  ELIGIBILITY: number;
  DECLARATIONS: number;
}

export interface XLSXRowIndexes {
  TITLES: XLSXTitleRowIndexes;
  ALTERNATIVE_TRADING_ADDRESS?: number;
  COMPANY_ADDRESS: number;
  COMPANY_SIC_CODES: number;
  BROKER_ADDRESS: number;
  BUYER_ADDRESS: number;
  BUYER_CONTACT_DETAILS: number;
  LOSS_PAYEE_ADDRESS: number;
}
