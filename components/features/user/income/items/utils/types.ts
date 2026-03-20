export interface Item {
  id: string;
  code: string;
  name: string;
  description: string;
  type: "Service" | "Good";
  category: string;
  unitPrice: number;
  incomeAccountId: string;
  incomeAccountName: string;
  isTaxable: boolean;
  isActive: boolean;
  entityId: string;
}

export type ItemsResponse = {
  items: Item[];
  total: number;
  totalServices: number;
  totalGoods: number;
  averagePrice: number;
};
