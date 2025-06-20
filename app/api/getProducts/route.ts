import prismaClient from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface MyResponseType extends NextResponse {
  params: Promise<{ action: string }>;
}
export async function GET(req: NextRequest, res: MyResponseType) {
  let products = await prismaClient.product.findMany({
    include: {
      rating: true,
    },
  });

  return NextResponse.json({
    status: true,
    data: products,
  });
}
