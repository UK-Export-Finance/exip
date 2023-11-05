export type BufferEncoding = 'hex' | 'base64' | 'ascii';

export interface ConnectId {
  id: string;
}

export interface ConnectObj {
  connect: ConnectId;
}

export interface SuccessResponse {
  success: boolean;
}
