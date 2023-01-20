import goodsOrServices from './goods-or-services';
import { ValidationErrors } from '../../../../../../../types';

const rules = [goodsOrServices] as Array<() => ValidationErrors>;

export default rules;
