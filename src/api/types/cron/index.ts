interface CronWhereUpdate {
  id: string;
}

interface CronApplicationDataUpdate {
  status: string;
  previousStatus: string;
  updatedAt?: Date;
}

export interface CronApplicationInactiveUpdate {
  where: CronWhereUpdate;
  data: CronApplicationDataUpdate;
}

interface CronAccountStatusDataUpdate {
  isInactive: boolean;
}

interface CronAccountDataUpdate {
  updatedAt: Date;
}

export interface CronAccountStatusUnverifiedUpdate {
  where: CronWhereUpdate;
  data: CronAccountStatusDataUpdate;
}

export interface CronAccountUpdate {
  where: CronWhereUpdate;
  data: CronAccountDataUpdate;
}
