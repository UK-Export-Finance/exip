import { Request, Response } from '../../../types';
import { mockReq, mockRes } from '../../test-mocks';
import { ROUTES } from '../../constants';
import { PAGES } from '../../content-strings';
import { mockCountryCanGetAQuoteByEmail, mockHighRiskCountry } from '../../test-mocks/mock-countries';
import { isHighRiskCountry } from './index';

const {
  TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT: {
    CONTACT_EFM: {
      REASON: { HIGH_RISK_COUNTRY_COVER_ABOVE_THRESHOLD },
    },
  },
} = PAGES;

describe('middleware/isHighRiskCountry', () => {
  const req: Request = mockReq();
  const res: Response = mockRes();

  const nextSpy = jest.fn();
  console.info = jest.fn();

  beforeEach(() => {});

  it('should call next if neither the buyer country exists in session and nor the URL is relevant', () => {
    // Arrange
    const mockRequest = {
      ...req,
      session: {
        submittedData: {
          quoteEligibility: {},
          insuranceEligibility: {},
        },
      },
      originalUrl: ROUTES.QUOTE.BUYER_COUNTRY,
    };

    // Act
    isHighRiskCountry(mockRequest, res, nextSpy);

    // Assert
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledWith();

    expect(console.info).not.toHaveBeenCalled();
  });

  it('should call next if the buyer country does not exists in session', () => {
    // Arrange
    const mockRequest = {
      ...req,
      session: {
        submittedData: {
          quoteEligibility: {},
          insuranceEligibility: {},
        },
      },
      originalUrl: ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
    };

    // Act
    isHighRiskCountry(mockRequest, res, nextSpy);

    // Assert
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledWith();

    expect(console.info).not.toHaveBeenCalled();
  });

  it('should call next if the URL is not relevant', () => {
    // Arrange
    const mockRequest = {
      ...req,
      session: {
        submittedData: {
          quoteEligibility: {
            buyerCountry: mockHighRiskCountry,
          },
          insuranceEligibility: {},
        },
      },
      originalUrl: ROUTES.QUOTE.BUYER_COUNTRY,
    };

    // Act
    isHighRiskCountry(mockRequest, res, nextSpy);

    // Assert
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledWith();

    expect(console.info).not.toHaveBeenCalled();
  });

  it('should call isHighRiskCountryEligible and then call next for a high risk country', () => {
    const percentageOfCover = 90;

    // Arrange
    const mockRequest = {
      ...req,
      session: {
        submittedData: {
          quoteEligibility: {
            buyerCountry: mockHighRiskCountry,
            percentageOfCover,
          },
          insuranceEligibility: {},
        },
      },
      originalUrl: ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
    };

    // Act
    isHighRiskCountry(mockRequest, res, nextSpy);

    // Assert
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledWith();

    expect(console.info).not.toHaveBeenCalled();
  });

  it('should call isHighRiskCountryEligible and then call next for a standard risk country', () => {
    const percentageOfCover = 95;

    // Arrange
    const mockRequest = {
      ...req,
      session: {
        submittedData: {
          quoteEligibility: {
            buyerCountry: mockCountryCanGetAQuoteByEmail,
            percentageOfCover,
          },
          insuranceEligibility: {},
        },
      },
      originalUrl: ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
    };

    // Act
    isHighRiskCountry(mockRequest, res, nextSpy);

    // Assert
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledWith();

    expect(console.info).not.toHaveBeenCalled();
  });

  it('should call isHighRiskCountryEligible and exit to talk to EFM page', () => {
    const percentageOfCover = 95;

    // Arrange
    const mockRequest = {
      ...req,
      session: {
        submittedData: {
          quoteEligibility: {
            buyerCountry: mockHighRiskCountry,
            percentageOfCover,
          },
          insuranceEligibility: {},
        },
      },
      originalUrl: ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
    };

    // Act
    isHighRiskCountry(mockRequest, res, nextSpy);

    // Assert
    expect(nextSpy).not.toHaveBeenCalled();

    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith('High risk country %s with high cover %i - cannot get a quote', mockHighRiskCountry?.name, percentageOfCover);

    expect(req.flash).toHaveBeenCalledTimes(1);
    expect(req.flash).toHaveBeenCalledWith('exitReason', HIGH_RISK_COUNTRY_COVER_ABOVE_THRESHOLD);

    expect(res.redirect).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
  });
});
