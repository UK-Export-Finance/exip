import rateLimit from 'express-rate-limit';
import rateLimiter from '.';

describe('api/middleware/rate-limiter', () => {
  it('should return express-rate-limit with correct config', async () => {
    const expected = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 1000,
      standardHeaders: false,
      legacyHeaders: false,
    });

    /**
     * Need to use JSON.stringify to match the result and assertion.
     * Otherwise, the test will fail with "serializes to the same string" error.
     */
    const result = JSON.stringify(rateLimiter);

    expect(result).toEqual(JSON.stringify(expected));
  });
});
