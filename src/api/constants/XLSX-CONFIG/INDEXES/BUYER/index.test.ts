import BUYER_INDEXES from '.';

describe('api/constants/XLSX-CONFIG/INDEXES/BUYER', () => {
  it('should return an object with indexes', () => {
    const expected = {
      BUYER_ADDRESS: 3,
    };

    expect(BUYER_INDEXES()).toEqual(expected);
  });
});
