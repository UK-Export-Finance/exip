interface Country {
  name: string;
  isoCode: string;
  riskCategory: string;
  selected?: boolean;
  value: string;
  shortTermCoverAvailable: boolean;
  nbiIssueAvailable: boolean;
}

export { Country };
