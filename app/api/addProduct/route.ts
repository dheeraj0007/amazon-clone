import prismaClient from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const products = await fetch("https://fakestoreapi.com/products");
  let finalProducts = await products.json();
  let finalData: any = [];
  finalProducts.map(async (product: any) => {
    let newProduct = await prismaClient.product.create({
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
    console.log("new product is ", newProduct);
    finalData.push(newProduct);
  });
  return NextResponse.json({
    status: true,
    data: finalData,
  });
}
