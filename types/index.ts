export interface ProdakInterface {
  id: string;
  name: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category?: { name: string; id: string } | null;
  categoryId?: string;
  userId: string;
  user: {
      name: string | null;
  };
  description: string ;
  image?: string;
}