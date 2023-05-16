import getValuesFromUserSessionOrApplication from '.';
import { mockApplication } from '../../test-mocks';
import FIELD_IDS from '../../constants/field-ids/insurance/business';
import { RequestSessionUser } from '../../../types';

const { BUSINESS } = FIELD_IDS;
const { BUSINESS_CONTACT_DETAIL } = FIELD_IDS.CONTACT;

describe('server/helpers/get-values-from-session-or-application', () => {
  const session = {
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'test@test.com',
    id: '123',
  } as RequestSessionUser;

  describe('when application contains relevant section', () => {
    it('should return application section', () => {
      const response = getValuesFromUserSessionOrApplication(mockApplication, BUSINESS, BUSINESS_CONTACT_DETAIL, session);

      const { id, __typename, ...sectionObject } = mockApplication[BUSINESS][BUSINESS_CONTACT_DETAIL];
      const expected = sectionObject;

      expect(response).toEqual(expected);
    });
  });

  describe('when application does not contain relevant section data', () => {
    it('should return session', () => {
      const applicationNoSection = mockApplication;

      applicationNoSection.business.businessContactDetail = {
        id: '123',
        firstName: '',
        lastName: '',
        email: '',
        position: '',
      };

      const response = getValuesFromUserSessionOrApplication(mockApplication, BUSINESS, BUSINESS_CONTACT_DETAIL, session);

      expect(response).toEqual(session);
    });
  });
});
