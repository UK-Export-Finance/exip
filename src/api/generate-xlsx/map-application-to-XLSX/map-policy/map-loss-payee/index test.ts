import mapLossPayee from '.';
import mapAppointedLossPayee from './map-appointed-loss-payee';
import mapLossPayeeFinancialDetailsInternational from './map-financial-details-international';
import mapLossPayeeFinancialDetailsUk from './map-financial-details-uk';
import mockApplication from '../../../../test-mocks/mock-application';

const { nominatedLossPayee } = mockApplication;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-loss-payee', () => {
  it('should return an array of mapped loss payee fields', () => {
    const result = mapLossPayee(nominatedLossPayee);

    const expected = [
      ...mapAppointedLossPayee(nominatedLossPayee),
      ...mapLossPayeeFinancialDetailsUk(nominatedLossPayee),
      ...mapLossPayeeFinancialDetailsInternational(nominatedLossPayee),
    ];

    expect(result).toEqual(expected);
  });
});
