import prismadb from '@/lib/prismadb';
import { SizeForm } from './components/size-form';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

const SizePage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  const { userId } = auth();

  if (!userId) redirect('/sing-in');


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size}/>
      </div>
    </div>
  );
};

export default SizePage;
