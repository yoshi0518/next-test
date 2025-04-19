import type { HomePresentationProps } from '@/features/home/types';

export const HomePresentation: React.FC<HomePresentationProps> = ({ debug }) => (
  <>
    <h1 className="text-3xl font-bold underline">Test2</h1>
    <p>DEBUG: {String(debug)}</p>
  </>
);
