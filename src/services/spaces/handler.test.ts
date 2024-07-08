import { handler } from './handler';

handler(
  {
    httpMethod: 'POST',
    body: JSON.stringify({ location: 'London' }),
  } as any,
  {} as any
);
