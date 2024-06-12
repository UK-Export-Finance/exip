import { Context } from '.keystone/types'; // eslint-disable-line
import getApplicationByReferenceNumberQuery from '.';
import getApplicationByReferenceNumber from '../../../helpers/get-application-by-reference-number';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import { createFullApplication } from '../../../test-helpers/create-full-application';
import { mockApplication } from '../../../test-mocks';

describe('custom-resolvers/get-application-by-reference-number', () => {
  let context: Context;
  let fullApplication;
  let refNumber: number;

  const populatedApplicationResponse = mockApplication;

  jest.mock('../../../helpers/get-populated-application');

  let getPopulatedApplicationSpy = jest.fn();

  beforeAll(() => {
    context = getKeystoneContext();
  });

  beforeAll(async () => {
    jest.resetAllMocks();

    fullApplication = await createFullApplication(context);

    const { referenceNumber } = fullApplication;

    refNumber = referenceNumber;
  });

  beforeEach(async () => {
    jest.resetAllMocks();

    getPopulatedApplicationSpy = jest.fn(() => populatedApplicationResponse);

    getPopulatedApplication.get = getPopulatedApplicationSpy;
  });

  describe('when the decryptFinancialUk and decryptFinancialInternational variables are NOT provided', () => {
    it('should call getPopulatedApplication.get', async () => {
      await getApplicationByReferenceNumberQuery({}, { referenceNumber: refNumber }, context);

      const expectedApplication = await getApplicationByReferenceNumber(refNumber, context);

      expect(getPopulatedApplicationSpy).toHaveBeenCalledTimes(1);
      expect(getPopulatedApplicationSpy).toHaveBeenCalledWith({
        context,
        application: expectedApplication,
        decryptFinancialUk: undefined,
        decryptFinancialInternational: undefined,
      });
    });

    it('should return success=true and populated application', async () => {
      const result = await getApplicationByReferenceNumberQuery({}, { referenceNumber: refNumber }, context);

      const expected = {
        success: true,
        application: populatedApplicationResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the decryptFinancialUk variable is set to true', () => {
    it('should call getPopulatedApplication.get', async () => {
      await getApplicationByReferenceNumberQuery({}, { referenceNumber: refNumber, decryptFinancialUk: true }, context);

      const expectedApplication = await getApplicationByReferenceNumber(refNumber, context);

      expect(getPopulatedApplicationSpy).toHaveBeenCalledTimes(1);
      expect(getPopulatedApplicationSpy).toHaveBeenCalledWith({
        context,
        application: expectedApplication,
        decryptFinancialUk: true,
      });
    });

    it('should return success=true and populated application', async () => {
      const result = await getApplicationByReferenceNumberQuery({}, { referenceNumber: refNumber, decryptFinancialUk: true }, context);

      const expected = {
        success: true,
        application: populatedApplicationResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the decryptFinancialInternational variable is set to true', () => {
    it('should call getPopulatedApplication.get', async () => {
      await getApplicationByReferenceNumberQuery({}, { referenceNumber: refNumber, decryptFinancialInternational: true }, context);

      const expectedApplication = await getApplicationByReferenceNumber(refNumber, context);

      expect(getPopulatedApplicationSpy).toHaveBeenCalledTimes(1);
      expect(getPopulatedApplicationSpy).toHaveBeenCalledWith({
        context,
        application: expectedApplication,
        decryptFinancialInternational: true,
      });
    });

    it('should return success=true and populated application', async () => {
      const result = await getApplicationByReferenceNumberQuery({}, { referenceNumber: refNumber, decryptFinancialInternational: true }, context);

      const expected = {
        success: true,
        application: populatedApplicationResponse,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when the application cannot be found', () => {
    it('should return success=false', async () => {
      const result = await getApplicationByReferenceNumberQuery({}, { referenceNumber: 123 }, context);

      expect(result.success).toEqual(false);
    });
  });

  describe('when an error occurs', () => {
    it('should throw an error', async () => {
      try {
        await getApplicationByReferenceNumberQuery({}, { referenceNumber: 0 }, context);
      } catch (err) {
        const errorString = String(err);

        expect(errorString.includes('Error generating buffer')).toEqual(true);
      }
    });
  });
});
