import * as dotenv from 'dotenv';
import express from 'express';
import { http } from './index';

dotenv.config();

const { PORT } = process.env;

describe('middleware/http', () => {
  // @ts-ignore
  let server: express;

  beforeEach(() => {
    // Mock the server object
    server = {
      on: jest.fn(),
      listen: jest.fn(),
    };
  });

  it('should start listening on specified port', () => {
    // Call the http function
    http(server);

    // Verify that the server.on method is called with the correct arguments
    expect(server.on).toHaveBeenCalledWith('error', expect.any(Function));

    // Verify that the server.listen method is called with the correct arguments
    expect(server.listen).toHaveBeenCalledWith(PORT, expect.any(Function));
  });
});
