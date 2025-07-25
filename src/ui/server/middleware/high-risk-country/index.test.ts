import { Request, Response } from '../../../types';
import { mockReq, mockRes } from '../../test-mocks';
import { isHighRiskCountry } from './index';

describe('middleware/isHighRiskCountry', () => {
  const req: Request = mockReq();
  const res: Response = mockRes();

  const nextSpy = jest.fn();

  beforeEach(() => {});

  it('should call next if the submittedData does not exists in session', () => {
    // Act
    isHighRiskCountry(req, res, nextSpy);

    // Assert
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(nextSpy).toHaveBeenCalledWith();
  });
});
