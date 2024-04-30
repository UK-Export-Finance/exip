interface ApplicationWhereUpdate {
  id: string;
}

interface ApplicationDataUpdate {
  status: string;
  previousStatus: string;
}

export interface InactiveApplicationUpdate {
  where: ApplicationWhereUpdate;
  data: ApplicationDataUpdate;
}
