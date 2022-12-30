import { Request, Response } from '../../../../../types';

export const get = async (req: Request, res: Response) => {
  return res.render(
    `<html>
    <head>
        <title>res.render() Demo</title>
    </head>
    <body>
        <h2>Welcome to GeeksforGeeks</h2>
    </body>
    </html>`,
    {},
  );
};
