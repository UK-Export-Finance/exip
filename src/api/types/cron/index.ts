interface CronApplicationWhereUpdate {
  id: string;
}

interface CronApplicationDataUpdate {
  status: string;
  previousStatus: string;
}

export interface CronApplicationInactiveUpdate {
  where: CronApplicationWhereUpdate;
  data: CronApplicationDataUpdate;
}
