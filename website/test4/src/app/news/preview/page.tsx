import { NewsPreviewComponent } from '@/features/news/components/preview';

const Page: React.FC<{ searchParams: { id: string; draftKey: string } }> = async ({ searchParams }) => {
  const { id, draftKey } = searchParams;

  return (
    <>
      <NewsPreviewComponent
        id={id}
        draftKey={draftKey}
      />
    </>
  );
};

export default Page;
