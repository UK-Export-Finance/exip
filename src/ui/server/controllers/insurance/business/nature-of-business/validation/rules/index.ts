import goodsOrServices from './goods-or-services';
import yearsExporting from './years-exporting';
import employeesUK from './employees-uk';
import { ValidationErrors } from '../../../../../../../types';

const rules = [goodsOrServices, yearsExporting, employeesUK] as Array<() => ValidationErrors>;

export default rules;
