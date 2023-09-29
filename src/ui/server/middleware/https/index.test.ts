import * as dotenv from 'dotenv';
import tls from 'https';
import fs from 'fs';
import express from 'express';
import { https } from './index';
import { TLS } from '../../constants';

dotenv.config();
const { UI_PORT } = process.env;

describe('middleware/https', () => {
  // @ts-ignore
  const mockServer = express();

  beforeEach(() => {
    // Mock the readFileSync function to return a dummy key and certificate
    jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(TLS.KEY.NAME).mockReturnValueOnce(TLS.CERTIFICATE.NAME);

    // Mock the tls.createServer function to return a dummy server
    jest.spyOn(tls, 'createServer').mockReturnValueOnce(mockServer);

    // Mock the ui.listen function to call the callback function
    jest.spyOn(mockServer, 'listen').mockImplementationOnce((port: number, callback: any) => {
      callback();
    });

    // Call the https function with a dummy server
    https(mockServer);
  });

  it('should read key and certificate files from the correct location', () => {
    // Expect the readFileSync function to be called with the correct file paths
    expect(fs.readFileSync).toHaveBeenCalledWith(TLS.KEY.NAME);
    expect(fs.readFileSync).toHaveBeenCalledWith(TLS.CERTIFICATE.NAME);
  });

  it('should start HTTPS server on specified port', () => {
    // Expect the createServer function to be called with the correct options and server
    expect(tls.createServer).toHaveBeenCalledWith(
      {
        key: TLS.KEY.NAME,
        cert: TLS.CERTIFICATE.NAME,
      },
      mockServer,
    );

    // Expect the listen function to be called with the specified port
    expect(mockServer.listen).toHaveBeenCalledWith(UI_PORT, expect.any(Function));
  });
});
