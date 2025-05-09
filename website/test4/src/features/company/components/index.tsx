import { getNasset } from '@/features/company/action';

export const CompanyComponent: React.FC = () => {
  const data = getNasset();

  return (
    <>
      <h2 className="mb-2 text-xl font-bold">会社案内</h2>
      <div>contents</div>
    </>
  );
};
