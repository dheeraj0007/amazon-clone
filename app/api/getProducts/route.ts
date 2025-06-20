import prismaClient from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
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
