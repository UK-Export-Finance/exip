import { format } from 'date-fns';

export const createTimestampFromNumbers = (day, month, year) => new Date(`${month} ${day} ${year}`);

export const formatDate = (timestamp) => format(new Date(timestamp), 'd MMMM yyyy');
