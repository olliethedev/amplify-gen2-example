import { type Schema } from '@/amplify/data/resource';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/data';
import { generateClient } from 'aws-amplify/api';
import amplifyConfig from '@/amplifyconfiguration.json';
import { cookies } from 'next/headers';

export const serverClient = generateServerClientUsingCookies<Schema>({
  config: amplifyConfig,
  cookies
});

export const client = generateClient<Schema>();