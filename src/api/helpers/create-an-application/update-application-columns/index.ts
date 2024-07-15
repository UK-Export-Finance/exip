import { Context } from '../../../types';

interface Temp {
  context: Context;
  applicationId: string;
  buyerId: string;
  companyId: string;
  eligibilityId: string;
  exportContractId: string;
  nominatedLossPayeeId: string;
  policyId: string;
  sectionReviewId: string;
}

/**
 * updateApplicationColumns
 * Update the application with relationships for:
 * 1) Buyer
 * 2) Company
 * 3) Eligibility
 * 4) Export contract
 * 5) Nominated loss payee
 * 6) Policy
 * 7) Section review
 * @param {Context} context: KeystoneJS context API
 * @param {String} applicationId: Application ID
 * @param {String} buyerId: Buyer ID
 * @param {String} companyId: Company ID
 * @param {String} eligibilityId: Eligibility ID
 * @param {String} exportContractId: Export contract ID
 * @param {String} nominatedLossPayeeId: Nominated loss payee ID
 * @param {String} policyId: Policy ID
 * @param {String} sectionReviewId: Section review ID
 */
const updateApplicationColumns = async ({
  context,
  applicationId,
  buyerId,
  companyId,
  eligibilityId,
  exportContractId,
  nominatedLossPayeeId,
  policyId,
  sectionReviewId,
}: Temp) => {
  try {
    console.info('Updating application relationship columns (updateApplicationColumns helper) for application %s', applicationId);

    const updatedApplication = await context.db.Application.updateOne({
      where: {
        id: applicationId,
      },
      data: {
        buyer: {
          connect: { id: buyerId },
        },
        company: {
          connect: { id: companyId },
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
