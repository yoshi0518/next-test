import type { CountStateType, UserStateType } from '@/common/types';
import { create } from 'zustand';

export const useUserStore = create<UserStateType>((set, get) => ({
  userId: 1,
  userName: 'John Doe',
  setName: (name) => set((state) => ({ ...state, userName: name })),
  display: () => `${get().userId}: ${get().userName}`,
}));

export const useCountStore = create<CountStateType>((set) => ({
  count: 0,
  increment: (num) => set((state) => ({ count: state.count + num })),
  decrement: (num) => set((state) => ({ count: state.count - num })),
  reset: () => set({ count: 0 }),
}));
