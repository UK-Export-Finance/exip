import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../constants';

export const createTimestampFromNumbers = (day, month, year) => new Date(`${month} ${day} ${year}`);

export const formatDate = (timestamp) => format(new Date(timestamp), DATE_FORMAT);
