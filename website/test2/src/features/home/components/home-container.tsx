import { env } from '@/common/env';
import { HomePresentation } from '@/features/home/components/home-presentation';

export const HomeContainer: React.FC = () => {
  console.log({ env });

  return <HomePresentation debug={env.DEBUG} />;
};
