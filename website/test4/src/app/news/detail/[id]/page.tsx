import { NewsDetailComponent } from '@/features/news/components/detail';

const Page: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  return (
    <>
      <NewsDetailComponent id={id} />
    </>
  );
};

export default Page;
