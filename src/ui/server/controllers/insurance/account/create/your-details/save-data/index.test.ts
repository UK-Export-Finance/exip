import save from '.';
import api from '../../../../../../api';
import { sanitiseData } from '../../../../../../helpers/sanitise-data';
import { mockAccount } from '../../../../../../test-mocks';

describe('controllers/account/create/your-details/save-data', () => {
  const mockCreateAccountResponse = mockAccount;

  let accountCreateSpy = jest.fn(() => Promise.resolve(mockCreateAccountResponse));

  const mockFormBody = mockAccount;

  beforeEach(() => {
    api.keystone.account.create = accountCreateSpy;
  });

  it('should call api.keystone.account.create with sanitised form data', async () => {
    await save.account(mockFormBody);

    expect(accountCreateSpy).toHaveBeenCalledTimes(1);

    const expectedSanitisedData = sanitiseData(mockFormBody);
    expect(accountCreateSpy).toHaveBeenCalledWith(expectedSanitisedData);
  });

  it('should return the API response', async () => {
    const result = await save.account(mockFormBody);

    expect(result).toEqual(mockCreateAccountResponse);
  });

  describe('api error handling', () => {
    describe('when there is an error', () => {
      beforeEach(() => {
        accountCreateSpy = jest.fn(() => Promise.reject());
        api.keystone.account.create = accountCreateSpy;
      });

      it('should throw an error', async () => {
        try {
          await save.account(mockFormBody);
        } catch (err) {
          const expected = new Error('Creating exporter account');
          expect(err).toEqual(expected);
        }
      });
    });
  });
});
