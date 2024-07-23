import { APPLICATION } from '../application';

export const CRON_DESCRIPTION_ACCOUNT_UPDATE_UNVERIFIED = 'Update unverified accounts (over 24hrs) to isInactive';

export const CRON_DESCRIPTION_APPLICATION_UPDATE_INACTIVE = `Update inactive applications (over ${APPLICATION.SUBMISSION_DEADLINE_IN_DAYS}) to Abandoned`;

export const CRON_DESCRIPTION_APPLICATION_SUBMISSION_DEADLINE_EMAIL = 'Email application submission deadline reminder';
