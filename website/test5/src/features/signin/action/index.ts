'use server';

import { signIn } from '@/common/auth';

export const signInGoogleAction = async () => await signIn('google', { redirectTo: '/' });

export const signInGithubAction = async () => await signIn('github', { redirectTo: '/' });
