import { NewsCategoryComponent } from '@/features/news/components/category';

const Page: React.FC<{ params: { category: string } }> = async ({ params }) => {
  const { category } = params;

  return (
    <>
      <NewsCategoryComponent category={category} />
    </>
  );
};

export default Page;
