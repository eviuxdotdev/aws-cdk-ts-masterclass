import { handler } from './handler';

handler(
  {
    httpMethod: 'DELETE',
    queryStringParameters: { id: '01J2B22F6G7355TSX0A761YF47' },
    // body: JSON.stringify({ location: 'London1' }),
  } as any,
  {} as any
).then(result => {
  console.log(result);
});
