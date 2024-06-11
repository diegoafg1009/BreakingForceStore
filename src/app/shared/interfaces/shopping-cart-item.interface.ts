import { GetVariation } from "../dtos";

export interface ShoppingCartItem {
  quantity: number;
  variation: GetVariation;
}

export interface LocalStorageShoppingCartItem {
  variationId: string;
  quantity: number;
}
