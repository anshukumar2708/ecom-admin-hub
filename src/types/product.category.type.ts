export interface IProductCategory {
  _id: string;
  name: string;
  image: string;
  description: string;
  isActive: boolean;
  displayOrder: number | null
  createdAt: string;
  updatedAt: string;
  __v: number;
}