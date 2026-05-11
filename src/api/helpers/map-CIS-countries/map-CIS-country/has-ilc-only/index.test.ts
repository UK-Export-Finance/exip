import hasILCOnly from '.';
import { EXTERNAL_API_DEFINITIONS } from '../../../../constants';

const {
  CIS: {
    SHORT_TERM_COVER: { ILC, UNLISTED },
  },
} = EXTERNAL_API_DEFINITIONS;

describe('hasILCOnly', () => {
  it('should return true if short term cover is ILC', () => {
    const result = hasILCOnly({ shortTermCover: ILC });

    expect(result).toEqual(true);
  });

  it('should return false if short term cover is not ILC', () => {
    const result = hasILCOnly({ shortTermCover: UNLISTED });

    expect(result).toEqual(false);
  });

  it('should return false if short term cover is an empty string', () => {
    const result = hasILCOnly({ shortTermCover: '' });

    expect(result).toEqual(false);
  });
});
