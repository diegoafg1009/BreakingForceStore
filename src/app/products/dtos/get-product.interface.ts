export interface GetProduct {
  id: string;
  name: string;
  lowerPrice: string;
  higherPrice: string;
  description?: string;
  category: string;
  objective: string;
  brand: string;
  isActive: boolean;
  images: string[];
  variations: GetVariationSimple[];
}

interface GetVariationSimple{
  id: string;
  unitPrice: string;
  weight: number;
  stock: number;
  flavorName: string;
}
