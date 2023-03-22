describe('server/helpers/check-completed-sections/exporter-business', () => {
  const { referenceNumber, policyAndExport } = mockApplication;
  const { policyType } = policyAndExport;

  describe('getBrokerTasks', () => {
    const { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER;

    describe('when isUsingBroker is "Yes"', () => {
      it('should return multiple field ids in an array', () => {
        const result = getBrokerTasks('Yes');

        const expected = [USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingBroker is "No"', () => {
      it('should return a single field id in an array', () => {
        const result = getBrokerTasks('No');

        const expected = [USING_BROKER];

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingBroker is undefined', () => {
      it('should return a single field id in an array', () => {
        const result = getBrokerTasks();

        const expected = [USING_BROKER];

        expect(result).toEqual(expected);
      });
    });
  });
})