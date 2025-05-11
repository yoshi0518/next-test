const Page: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  return (
    <>
      <div>News Detail：{id}</div>
    </>
  );
};

export default Page;
