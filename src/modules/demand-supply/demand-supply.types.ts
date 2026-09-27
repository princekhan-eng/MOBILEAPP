export interface DemandScore {
  productId: string;
  searchVolume: number;
  viewCount: number;
  score: number;
}

export interface SupplyScore {
  productId: string;
  totalInventoryQuantity: number;
  competingShopsCount: number;
  supplyLevel: 'LOW' | 'OPTIMAL' | 'HIGH';
}

export interface MarketOpportunity {
  brand: string;
  model: string;
  demandIndex: number;
  supplyIndex: number;
  opportunityGap: number; // Demand - Supply
}
