import goodsOrServices from './goods-or-services';
import yearsExporting from './years-exporting';
import { ValidationErrors } from '../../../../../../../types';

const rules = [goodsOrServices, yearsExporting] as Array<() => ValidationErrors>;

export default rules;
