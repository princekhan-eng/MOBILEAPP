export type UserRole = 'SUPER_ADMIN' | 'SHOP_ADMIN' | 'SHOP_EMPLOYEE' | 'CUSTOMER';

export type ShopStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED';

export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'OUT_OF_STOCK';

export type SubscriptionStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'PENDING';

export type AnalyticsEventType = 
  | 'PRODUCT_VIEW'
  | 'PRODUCT_SEARCH'
  | 'PRODUCT_CLICK'
  | 'PRODUCT_SALE'
  | 'STOCK_CHANGE';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  shopId?: string | null;
}
