export interface GetVariation{
  id: string;
  unitPrice: number;
  weight: number;
  productName: string;
  stock: number;
  isActive: boolean;
  flavorName?: string;
  flavorColor?: string;
  image: string;
}
