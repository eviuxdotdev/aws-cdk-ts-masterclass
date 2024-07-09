import { Amplify } from 'aws-amplify';
import { signIn, SignInOutput } from 'aws-amplify/auth';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_53BKlJDQh',
      userPoolClientId: '6m6aot2mt5pvupsm83uvralhif',
    },
  },
});

export class AuthService {
  public async login(username: string, password: string) {
    const result: SignInOutput = await signIn({
      username,
      password,
      options: { authFlowType: 'USER_PASSWORD_AUTH' },
    });

    return result;
  }
}
