export type RatingType = {
  id: string;
  rate: number;
  count: number;
};

export type ProductType = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isAdded: boolean;
  ratingId: string;
  rating: RatingType;
};
