import XLSX_ROW_INDEXES from '.';
import SECTION_NAMES from '../SECTION_NAMES';
import EXPORTER_BUSINESS_INDEXES from './EXPORTER_BUSINESS';
import POLICY_INDEXES from './POLICY';
import BUYER_INDEXES from './BUYER';
import EXPORT_CONTRACT_INDEXES from './EXPORT_CONTRACT';
import { mockApplication } from '../../../test-mocks';

const { EXPORTER_BUSINESS, POLICY, BUYER, EXPORT_CONTRACT } = SECTION_NAMES;

describe('api/constants/XLSX-CONFIG/INDEXES', () => {
  it('should return an object with section/worksheet specific indexes', () => {
    expect(XLSX_ROW_INDEXES[EXPORTER_BUSINESS](mockApplication)).toEqual(EXPORTER_BUSINESS_INDEXES(mockApplication));
    expect(XLSX_ROW_INDEXES[POLICY](mockApplication)).toEqual(POLICY_INDEXES(mockApplication));
    expect(XLSX_ROW_INDEXES[BUYER](mockApplication)).toEqual(BUYER_INDEXES());
    expect(XLSX_ROW_INDEXES[EXPORT_CONTRACT](mockApplication)).toEqual(EXPORT_CONTRACT_INDEXES(mockApplication));
  });
});
