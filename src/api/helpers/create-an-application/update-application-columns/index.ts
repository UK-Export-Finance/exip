import { UpdateApplicationRelationshipParams } from '../../../types';

/**
 * updateApplicationColumns
 * Update the application with relationships for:
 * 1) Broker
 * 2) Business
 * 3) Buyer
 * 4) Company
 * 5) Decalaration
 * 6) Eligibility
 * 7) Export contract
 * 8) Nominated loss payee
 * 9) Policy
 * 10) Policy contact
 * 11) Refernece number
 * 12) Section review
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @param {String} brokerId: Broker ID
 * @param {String} businessId: Business ID
 * @param {String} buyerId: Buyer ID
 * @param {String} companyId: Company ID
 * @param {String} declarationId: Declaration ID
 * @param {String} eligibilityId: Eligibility ID
 * @param {String} exportContractId: Export contract ID
 * @param {String} nominatedLossPayeeId: Nominated loss payee ID
 * @param {String} policyId: Policy ID
 * @param {String} policyContactId: Policy contact ID
 * @param {String} referenceNumberId: Reference number ID
 * @param {String} sectionReviewId: Section review ID
 */
const updateApplicationColumns = async ({
  context,
  applicationId,
  brokerId,
  businessId,
  buyerId,
  companyId,
  declarationId,
  eligibilityId,
  exportContractId,
  nominatedLossPayeeId,
  policyId,
  policyContactId,
  referenceNumberId,
  sectionReviewId,
}: UpdateApplicationRelationshipParams) => {
  try {
    console.info('Updating application relationship columns (updateApplicationColumns helper) for application %s', applicationId);

    const updatedApplication = await context.db.Application.updateOne({
      where: {
        id: applicationId,
      },
      data: {
        broker: {
          connect: { id: brokerId },
        },
        business: {
          connect: { id: businessId },
        },
        buyer: {
          connect: { id: buyerId },
        },
        company: {
          connect: { id: companyId },
        },
        declaration: {
          connect: { id: declarationId },
        },
        eligibility: {
          connect: { id: eligibilityId },
        },
        exportContract: {
          connect: { id: exportContractId },
        },
        nominatedLossPayee: {
          connect: { id: nominatedLossPayeeId },
        },
        policy: {
          connect: { id: policyId },
        },
        policyContact: {
          connect: { id: policyContactId },
        },
        referenceNumber: {
          connect: { id: referenceNumberId },
        },
        sectionReview: {
          connect: { id: sectionReviewId },
        },
      },
    });

    return updatedApplication;
  } catch (err) {
    console.error(`Error updating application relationship columns (updateApplicationColumns helper) for application ${applicationId} %O`, err);

    throw new Error(`Updating application relationship columns (updateApplicationColumns helper) for application ${applicationId} ${err}`);
  }
};

const applicationColumns = {
  update: updateApplicationColumns,
};

export default applicationColumns;
