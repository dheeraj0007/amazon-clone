import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prismaClient from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      console.log(session.user);
      let user = session.user;
      let cart = await prismaClient.cart.findFirst({
        where: {
          userId: user.id,
        },
        include: {
          CartProduct: {
            include: {
              product: {
                include: {
                  rating: true,
                },
              },
            },
          },
        },
      });

      const cartProducts = await prismaClient.cartProduct.findMany({
        where: {
          cartId: cart?.id,
        },
        select: {
          quantity: true,
        },
      });
      const cartCount = cartProducts.reduce((sum, p) => sum + p.quantity, 0);
      if (cart) {
        return NextResponse.json({ status: true, data: cart, cartCount });
      }

      const newCart = await prismaClient.cart.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        include: {
          CartProduct: true,
        },
      });
      return NextResponse.json({
        status: true,
        data: newCart,
        cartCount: 0,
      });
    } else {
      return NextResponse.json({
        status: false,
        message: "Unauthenticated",
      });
    }
  } catch (error) {
    console.error("Error getting cart:", error);
    return NextResponse.json({
      status: false,
      message: "Server error",
    });
  }
}
