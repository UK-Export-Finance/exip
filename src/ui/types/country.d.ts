interface Country {
  name: string;
  isoCode: string;
  riskCategory: string;
  selected?: boolean;
  value: string;
  shortTermCover: string;
  nbiIssueAvailable: boolean;
}

export { Country };
