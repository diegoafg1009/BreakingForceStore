export interface GetVariation{
  id: string;
  unitPrice: number;
  weight: number;
  productName: string;
  productId: string;
  stock: number;
  isActive: boolean;
  flavorName?: string;
  flavorColor?: string;
  image: string;
}
