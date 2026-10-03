export interface PriceOffer {
  store: string;
  productName: string;
  title: string;
  price: number;
  rawPrice: string;
  url: string;
  capturedAt: string;
  targetPrice: number;
  belowTarget: boolean;
  difference: number;
  percentage: number;
}