'use server';

import { signOut } from '@/common/auth';

export const signOutAction = async () => await signOut();
