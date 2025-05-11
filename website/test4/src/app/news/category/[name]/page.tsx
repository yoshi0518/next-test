const Page: React.FC<{ params: { name: string } }> = async ({ params }) => {
  const { name } = params;

  return (
    <>
      <div>Category：{decodeURIComponent(name)}</div>
    </>
  );
};

export default Page;
