import prismaClient from "@/app/lib/db";
const getProducts = async () => {
  let productsData = await prismaClient.product.findMany({
    include: {
      rating: true,
    },
  });

  return productsData;
};

export { getProducts };
