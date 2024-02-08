import save, { nullOrEmptyStringFields } from '.';
import api from '../../../../../api';
import { sanitiseData } from '../../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../../helpers/strip-empty-form-fields';
import getDataToSave from '../../../../../helpers/get-data-to-save';
import { mockApplication, mockBuyerRelationship } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';
import YOUR_BUYER_FIELD_IDS from '../../../../../constants/field-ids/insurance/your-buyer';

const { CONNECTION_WITH_BUYER_DESCRIPTION } = YOUR_BUYER_FIELD_IDS;

describe('controllers/insurance/your-buyer/save-data/buyer-relationship', () => {
  describe('nullOrEmptyStringFields', () => {
    it('should have the relevant fieldIds', () => {
      expect(nullOrEmptyStringFields).toEqual([CONNECTION_WITH_BUYER_DESCRIPTION]);
    });
  });

  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  describe('buyer-relationship', () => {
    const mockFormBody = mockBuyerRelationship;

    beforeEach(() => {
      api.keystone.application.update.buyerRelationship = updateApplicationSpy;
    });

    describe('when errorList is provided', () => {
      const mockValidationErrors = generateValidationErrors(CONNECTION_WITH_BUYER_DESCRIPTION, 'error', {});

      it(`should call api.keystone.application.update.buyerRelationship with all fields but not ${CONNECTION_WITH_BUYER_DESCRIPTION}`, async () => {
        await save.buyerRelationship(mockApplication, mockFormBody, mockValidationErrors.errorList);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

        const dataToSave = getDataToSave(mockFormBody, mockValidationErrors.errorList);
        const expectedSanitisedData = stripEmptyFormFields(sanitiseData(dataToSave), nullOrEmptyStringFields);
        expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.buyer.buyerRelationship.id, expectedSanitisedData);
      });

      it('should return the API response', async () => {
        const result = await save.buyerRelationship(mockApplication, mockFormBody);

        expect(result).toEqual(mockUpdateApplicationResponse);
      });
    });

    describe('when errorList is NOT provided', () => {
      it('should call api.keystone.application.update.buyerRelationship with all fields', async () => {
        await save.buyerRelationship(mockApplication, mockFormBody);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

        const dataToSave = getDataToSave(mockFormBody);
        const expectedSanitisedData = stripEmptyFormFields(sanitiseData(dataToSave), nullOrEmptyStringFields);
        expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.buyer.buyerRelationship.id, expectedSanitisedData);
      });

      it('should return the API response', async () => {
        const result = await save.buyerRelationship(mockApplication, mockFormBody);

        expect(result).toEqual(mockUpdateApplicationResponse);
      });
    });
  });

  describe('api error handling', () => {
    describe('update buyerRelationship call', () => {
      const mockFormBody = mockBuyerRelationship;

      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.application.update.buyerRelationship = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.buyerRelationship(mockApplication, mockFormBody);
          } catch (err) {
            const expected = new Error('Updating buyer relationship');
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
