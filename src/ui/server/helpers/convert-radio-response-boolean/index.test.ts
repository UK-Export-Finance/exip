import convertRadioButtonResponse from '.';

describe('server/helpers/convert-radio-response-boolean', () => {
  it("should return true if response is 'true'", () => {
    const response = convertRadioButtonResponse('true');

    expect(response).toEqual(true);
  });

  it("should return false if response is 'false'", () => {
    const response = convertRadioButtonResponse('false');

    expect(response).toEqual(false);
  });

  it('should return empty string if no response', () => {
    const response = convertRadioButtonResponse('');

    expect(response).toEqual('');
  });
});
