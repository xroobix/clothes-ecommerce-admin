import prismadb from '@/lib/prismadb';
import { ColorForm } from './components/color-form';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

const ColorPage = async ({
  params,
}: {
  params: { colorId: string };
}) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  const { userId } = auth();

  if (!userId) redirect('/sing-in');


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color}/>
      </div>
    </div>
  );
};

export default ColorPage;
