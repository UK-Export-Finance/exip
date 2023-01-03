interface Country {
  id?: string;
  name: string;
  text?: string;
  isoCode: string;
  riskCategory: string;
  selected?: boolean;
  value: string;
  shortTermCover: string;
  nbiIssueAvailable: boolean;
}

export { Country };
