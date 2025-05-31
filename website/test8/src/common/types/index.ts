export type UserStateType = {
  userId: number;
  userName: string;
  setName: (name: string) => void;
  display: () => string;
};

export type CountStateType = {
  count: number;
  increment: (num: number) => void;
  decrement: (num: number) => void;
  reset: () => void;
};
