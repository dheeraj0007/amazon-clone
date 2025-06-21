import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import prismaClient from "@/app/lib/db";

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session.user);
    if (!session?.user) {
      return NextResponse.json({
        status: false,
        message: "You must be logged in to add products to the cart.",
      });
    }
    if (session) {
      let productId = req.nextUrl.searchParams.get("productId");
      let currCart = await prismaClient.cart.findUnique({
        where: {
          userId: session.user && session.user.id,
        },
      });
      if (!currCart) {
        currCart = await prismaClient.cart.create({
          data: {
            userId: session.user && session.user.id,
          },
        });
      }
      let currProduct = await prismaClient.product.findUnique({
        where: {
          id: productId ?? "",
        },
      });
      if (!currProduct) {
        return NextResponse.json({
          status: false,
          message: "Product not found",
        });
      }
      const existingCartProduct = await prismaClient.cartProduct.findUnique({
        where: {
          cartId_productId: {
            cartId: currCart.id,
            productId: currProduct.id,
          },
        },
      });
      if (existingCartProduct) {
        await prismaClient.cartProduct.update({
          where: {
            cartId_productId: {
              cartId: currCart.id,
              productId: currProduct.id,
            },
          },
          data: {
            quantity: {
              increment: 1,
            },
          },
        });
      } else {
        await prismaClient.cartProduct.create({
          data: {
            cartId: currCart.id,
            productId: currProduct.id,
            quantity: 1,
          },
        });
      }

      // update cart total
      let updatedCart = await prismaClient.cart.update({
        where: {
          id: currCart.id,
        },
        data: {
          amount: {
            increment: currProduct.price,
          },
        },
      });

      const cartProducts = await prismaClient.cartProduct.findMany({
        where: {
          cartId: currCart.id,
        },
        select: {
          quantity: true,
        },
      });
      const cartCount = cartProducts.reduce((sum, p) => sum + p.quantity, 0);
      return NextResponse.json({
        status: true,
        data: updatedCart,
        cartCount,
      });
    }
    return NextResponse.json({
      status: true,
      message: "You must be logged in to add products to the cart.",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: true,
      message:
        error.message ||
        "An error occurred while adding the product to the cart.",
    });
  }
}
