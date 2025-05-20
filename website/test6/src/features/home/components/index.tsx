import { logoutAction } from '@/common/action';
import { auth } from '@/common/auth';
import { Button } from '@/common/components/ui';

export const Home: React.FC = async () => {
  const session = await auth();

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">Home</h2>
      <div>
        <pre className="bg-slate-100 p-2 text-sm text-slate-700">
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
      <div>
        <Button
          onClick={logoutAction}
          type="button"
          variant="outline"
          className="cursor-pointer"
        >
          ログアウト
        </Button>
      </div>
    </>
  );
};
