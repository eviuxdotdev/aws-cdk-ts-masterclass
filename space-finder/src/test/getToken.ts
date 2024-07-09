import { fetchAuthSession } from 'aws-amplify/auth';
import { AuthService } from './AuthService';

async function getToken(username: string, password: string) {
  const service = new AuthService();
  await service.login(username, password);

  const { idToken } = (await fetchAuthSession()).tokens ?? {};

  return idToken;
}


getToken('nemo', 'zDkMnGY9HqYMx9z!').then(jwt => console.log(jwt.toString()))
