import { Button } from '@/common/components/ui';
import { FaGithub, FaGoogle } from 'react-icons/fa6';

import { signInGithubAction, signInGoogleAction } from '../action';

export const SignInComponent: React.FC = () => {
  return (
    <>
      <h2 className="mb-2 text-xl font-bold">Signin</h2>
      <div className="flex gap-4">
        <Button
          onClick={signInGoogleAction}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <FaGoogle />
          Google
        </Button>

        <Button
          onClick={signInGithubAction}
          className="bg-gray-600 hover:bg-gray-700"
        >
          <FaGithub />
          Github
        </Button>
      </div>
    </>
  );
};
