export interface IBucketModel {
  id: string
  quantity: number
  products_id: string
  bucket_id: string
  createdAt: string
  updatedAt: string
  products: Products
}

export interface Products {
  id: string
  title: string
  description: string
  manufacturer: string
  price: number
  photo: string
  id_model: any
  id_provider: any
  id_categories: string
  createdAt: string
  updatedAt: string
}
