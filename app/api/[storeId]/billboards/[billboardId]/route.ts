import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { label, imageURL } = await req.json();
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }
    if (!imageURL) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store Id is required', { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const updatedBillboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageURL,
      },
    });

    return NextResponse.json(updatedBillboard);
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!params.storeId) {
      return new NextResponse('Store Id is required', { status: 400 });
    }
    if (!params.billboardId) {
      return new NextResponse('Billboard Id is required', { status: 400 });
    }
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        storeId: params.storeId,
        id: params.billboardId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
