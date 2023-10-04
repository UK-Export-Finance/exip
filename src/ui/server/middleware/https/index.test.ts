import * as dotenv from 'dotenv';
import tls from 'https';
import express from 'express';
import { https } from './index';
import { TLS } from '../../constants';

dotenv.config();

const { PORT, UI_PORT, TLS_CERTIFICATE, TLS_KEY } = process.env;

describe('middleware/https', () => {
  // @ts-ignore
  const mockServer = express();
  // Azure requires `PORT` whilst GHA requires `UI_PORT`
  const port = Number(PORT) || Number(UI_PORT);

  beforeEach(() => {
    // Mock the tls.createServer function to return a dummy server
    jest.spyOn(tls, 'createServer').mockReturnValueOnce(mockServer);

    // Mock the ui.listen function to call the callback function
    jest.spyOn(mockServer, 'listen').mockImplementationOnce((portNumber: number, callback: any) => {
      callback();
    });

    // Call the https function with a dummy server
    https(mockServer);
  });

  it('should ensure both certificate and key are not empty', () => {
    // Expect the readFileSync function to be called with the correct file paths
    expect(TLS_CERTIFICATE).not.toBeFalsy();
    expect(TLS_KEY).not.toBeFalsy();
  });

  it('should start HTTPS server on specified port', () => {
    // Expect the createServer function to be called with the correct options and server
    expect(tls.createServer).toHaveBeenCalledWith(
      {
        key: TLS.KEY.VALUE,
        cert: TLS.CERTIFICATE.VALUE,
      },
      mockServer,
    );

    // Expect the listen function to be called with the specified port
    expect(mockServer.listen).toHaveBeenCalledWith(port, expect.any(Function));
  });
});
