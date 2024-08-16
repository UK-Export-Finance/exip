/**
 * completeAndSubmitEligibilityForms
 * completes eligibility forms up to the specified section
 * eg, when 'companyDetails' is passed, it will complete all forms up to and including 'companyDetails'
 * @param {String} form: the form to complete
 * @param {String} companyNumber: the company number to use in the companies house search form
 * @param {Boolean} coverPeriodIsUnderThreshold: whether the cover period is under the threshold
 * @param {Boolean} memberOfAGroup: whether the company is a member of a group
 * @param {Boolean} partyToConsortium: whether the company is a party to a consortium
 */
const completeAndSubmitEligibilityForms = ({ form, companyNumber, coverPeriodIsUnderThreshold, memberOfAGroup, partyToConsortium }) => {
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
   * if the step name matches the section, it breaks out of the loop
   */
  for (const step of steps) {
    step.action();

    if (step.name === form) {
      break;
    }
  }
};

export default completeAndSubmitEligibilityForms;
