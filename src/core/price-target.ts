export interface PriceTargetResult {
  belowTarget: boolean;
  difference: number;
  percentage: number;
}

export function comparePriceToTarget(
  price: number,
  targetPrice: number,
): PriceTargetResult {
  const difference = targetPrice - price;

  const percentage = targetPrice > 0
    ? (difference / targetPrice) * 100
    : 0;

  return {
    belowTarget: price <= targetPrice,
    difference,
    percentage,
  };
}