import prismadb from '@/lib/prismadb';
import { BillboardForm } from './components/billboard-form';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  const { userId } = auth();

  if (!userId) redirect('/sing-in');


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard}/>
      </div>
    </div>
  );
};

export default BillboardPage;
