import mapFeedbackSatisfaction from '.';
import { FEEDBACK } from '../../constants';

const { VERY_SATISFIED, SATISFIED, NEITHER, DISSATISFIED, VERY_DISSATISIFED, EMAIL_TEXT } = FEEDBACK;

describe('api/helpers/map-feedback-satisfaction', () => {
  describe(VERY_SATISFIED, () => {
    it(`should return ${EMAIL_TEXT.verySatisfied}`, () => {
      const response = mapFeedbackSatisfaction(VERY_SATISFIED);
      const expected = EMAIL_TEXT.verySatisfied;

      expect(response).toEqual(expected);
    });
  });

  describe(SATISFIED, () => {
    it(`should return ${EMAIL_TEXT.satisfied}`, () => {
      const response = mapFeedbackSatisfaction(SATISFIED);
      const expected = EMAIL_TEXT.satisfied;

      expect(response).toEqual(expected);
    });
  });

  describe(NEITHER, () => {
    it(`should return ${EMAIL_TEXT.neither}`, () => {
      const response = mapFeedbackSatisfaction(NEITHER);
      const expected = EMAIL_TEXT.neither;

      expect(response).toEqual(expected);
    });
  });

  describe(DISSATISFIED, () => {
    it(`should return ${EMAIL_TEXT.dissatisfied}`, () => {
      const response = mapFeedbackSatisfaction(DISSATISFIED);
      const expected = EMAIL_TEXT.dissatisfied;

      expect(response).toEqual(expected);
    });
  });

  describe(VERY_DISSATISIFED, () => {
    it(`should return ${EMAIL_TEXT.veryDissatisfied}`, () => {
      const response = mapFeedbackSatisfaction(VERY_DISSATISIFED);
      const expected = EMAIL_TEXT.veryDissatisfied;

      expect(response).toEqual(expected);
    });
  });
});
