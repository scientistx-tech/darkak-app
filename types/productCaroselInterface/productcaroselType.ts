export interface ProductCardProps {
  id: string; 
  productName: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: string[];
  stock: number;
  onPressBuy: () => void;
  onPressAddToCart: () => void;
  onPressPreOrder: () => void;
  onPressFavorite: () => void;
  onPressView: () => void;
  onPressCompare: () => void;
}

export interface ProductCardData {
  data: ProductCardProps;
}
