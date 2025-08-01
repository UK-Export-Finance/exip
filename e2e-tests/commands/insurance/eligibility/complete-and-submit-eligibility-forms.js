/**
 * completeAndSubmitEligibilityForms
 * completes eligibility forms up to the specified form to stop at
 * eg, when 'companyDetails' is passed, it will complete all forms up to and including 'companyDetails'
 * @param {string} stopSubmittingAfter: The final form to submit
 * @param {string} companyNumber: the company number to use in the companies house search form
 * @param {boolean} coverPeriodIsUnderThreshold: whether the cover period is under the threshold
 * @param {boolean} memberOfAGroup: whether the company is a member of a group
 * @param {boolean} partyToConsortium: whether the company is a party to a consortium
 */
const completeAndSubmitEligibilityForms = ({ stopSubmittingAfter, companyNumber, coverPeriodIsUnderThreshold, memberOfAGroup, partyToConsortium }) => {
  cy.navigateToCheckIfEligibleUrl();

  const steps = [
    { name: 'checkIfEligible', action: () => cy.completeCheckIfEligibleForm() },
    { name: 'exporterLocation', action: () => cy.completeExporterLocationForm() },
    { name: 'companiesHouseNumber', action: () => cy.completeCompaniesHouseNumberForm() },
    { name: 'companiesHouseNumberSearch', action: () => cy.completeAndSubmitCompaniesHouseSearchForm({ companyNumber }) },
    { name: 'companyDetails', action: () => cy.completeEligibilityCompanyDetailsForm() },
    { name: 'buyerCountry', action: () => cy.completeAndSubmitBuyerCountryForm({}) },
    { name: 'totalValueInsured', action: () => cy.completeAndSubmitTotalValueInsuredForm({}) },
    { name: 'coverPeriod', action: () => cy.completeCoverPeriodForm({ underThreshold: coverPeriodIsUnderThreshold }) },
    { name: 'ukGoodsAndServices', action: () => cy.completeUkGoodsAndServicesForm() },
    { name: 'endBuyer', action: () => cy.completeEndBuyerForm() },
    { name: 'partyToConsortium', action: () => cy.completePartyToConsortiumForm({ partyToConsortium }) },
    { name: 'memberOfAGroup', action: () => cy.completeMemberOfAGroupForm({ memberOfAGroup }) },
  ];

  /**
   * carries out steps in steps array
   * if the step name matches the form to stop at, it breaks out of the loop
   */
  for (const step of steps) {
    step.action();

    if (step.name === stopSubmittingAfter) {
      break;
    }
  }
};

export default completeAndSubmitEligibilityForms;
