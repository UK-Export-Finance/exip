import goodsOrServices from './goods-or-services';
import yearsExporting from './years-exporting';
import employeesUK from './employees-uk';
import employeesInternational from './employees-international';
import { ValidationErrors } from '../../../../../../../types';

const rules = [goodsOrServices, yearsExporting, employeesUK, employeesInternational] as Array<() => ValidationErrors>;

export default rules;
