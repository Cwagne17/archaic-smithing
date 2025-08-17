// AWS Amplify configuration
// TODO: Configure when deploying to AWS Amplify

export const amplifyConfig = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
  },
  API: {
    endpoints: [
      {
        name: 'api',
        endpoint: process.env.NEXT_PUBLIC_API_URL || '',
        region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      },
    ],
  },
  Storage: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    bucket: process.env.NEXT_PUBLIC_S3_BUCKET || '',
  },
};

export function initializeAmplify() {
  // TODO: Initialize Amplify when not in mock mode
  if (process.env.NEXT_PUBLIC_MOCK_MODE !== 'true') {
    // Amplify.configure(amplifyConfig);
  }
}
