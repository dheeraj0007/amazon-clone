import prismaClient from "@/app/lib/db";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({
        status: false,
        message: "You must be logged in to add products to the cart.",
      });
    }
    if (session) {
      const productId = req.nextUrl.searchParams.get("productId");
      if (!productId) {
        return NextResponse.json({
          status: false,
          message: "Product id required",
        });
      }
      let currCart = await prismaClient.cart.findUnique({
        where: {
          userId: session.user && session.user.id,
        },
      });
      if (!currCart) {
        return NextResponse.json({
          status: false,
          messsage: "Cart not found",
        });
      }
      const cartProduct = await prismaClient.cartProduct.findUnique({
        where: {
          cartId_productId: {
            cartId: currCart.id,
            productId: productId,
          },
        },
        include: {
          product: true,
        },
      });
      if (!cartProduct) {
        return NextResponse.json({
          status: false,
          message: "Product not found in cart",
        });
      }

      const productPrice = cartProduct.product.price;
      const productQuantity = cartProduct.quantity;
      const amountToSubtract = Math.round(productPrice) * productQuantity;

      await prismaClient.cartProduct.delete({
        where: {
          cartId_productId: {
            cartId: currCart.id,
            productId: productId,
          },
        },
      });
      const updatedCart = await prismaClient.cart.update({
        where: { id: currCart.id },
        data: {
          amount: {
            decrement: amountToSubtract,
          },
        },
        include: { CartProduct: true },
      });

      if (updatedCart.amount < 0) {
        await prismaClient.cart.update({
          where: { id: currCart.id },
          data: {
            amount: 0,
          },
        });
      }
      const cartCount =
        updatedCart?.CartProduct.reduce(
          (acc, item) => acc + item.quantity,
          0
        ) || 0;

      return NextResponse.json({ status: true, message: "Removed", cartCount });
    }
  } catch (err: any) {
    console.log("Error deleting product from cart", err.message);
    return NextResponse.json({
      status: false,
      message: "server error",
    });
  }
}
