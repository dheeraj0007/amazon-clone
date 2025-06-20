import prismaClient from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface MyResponseType extends NextResponse {
  params: Promise<{ action: string }>;
}
export async function GET(req: Request, res: MyResponseType) {
  const products = await fetch("https://fakestoreapi.com/products");
  const finalProducts = await products.json();

  const finalData: any[] = [];

  for (const product of finalProducts) {
    const newProduct = await prismaClient.product.create({
      data: {
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
        title: product.title,
        rating: {
          create: {
            count: product.rating.count,
            rate: product.rating.rate,
          },
        },
      },
    });
    finalData.push(newProduct);
  }

  return NextResponse.json({
    status: true,
    data: finalData,
  });
}
