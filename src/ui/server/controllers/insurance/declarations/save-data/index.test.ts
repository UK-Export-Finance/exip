import save from '.';
import api from '../../../../api';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import stripEmptyFormFields from '../../../../helpers/strip-empty-form-fields';
import { FIELD_IDS } from '../../../../constants';
import { mockApplication } from '../../../../test-mocks';

const {
  DECLARATIONS: { AGREE_CONFIDENTIALITY },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/declarations/save-data', () => {
  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  const mockFormBody = {
    [AGREE_CONFIDENTIALITY]: 'true',
  };

  beforeEach(() => {
    api.keystone.application.update.declarations = updateApplicationSpy;
  });

  it('should return the API response', async () => {
    const result = await save.declaration(mockApplication, mockFormBody);

    expect(result).toEqual(mockUpdateApplicationResponse);
  });

  it('should call api.keystone.application.update.declarations with declaration ID and sanitised data without empty fields', async () => {
    await save.declaration(mockApplication, mockFormBody);

    expect(updateApplicationSpy).toHaveBeenCalledTimes(1);

    const fieldsWithValues = stripEmptyFormFields(mockFormBody);

    const expectedData = sanitiseData(fieldsWithValues);

    expect(updateApplicationSpy).toHaveBeenCalledWith(mockApplication.declaration.id, expectedData);
  });

  it('should return the API response', async () => {
    const result = await save.declaration(mockApplication, mockFormBody);

    expect(result).toEqual(mockUpdateApplicationResponse);
  });

  describe('api error handling', () => {
    describe('update declarations call', () => {
      describe('when there is an error', () => {
        beforeEach(() => {
          updateApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.application.update.declarations = updateApplicationSpy;
        });

        it('should throw an error', async () => {
          try {
            await save.declaration(mockApplication, mockFormBody);
          } catch (err) {
            const expected = new Error("Updating application's declarations");
            expect(err).toEqual(expected);
          }
        });
      });
    });
  });
});
