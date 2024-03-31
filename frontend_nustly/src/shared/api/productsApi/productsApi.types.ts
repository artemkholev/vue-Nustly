export interface IProducts {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly manufacturer: string;
  readonly price: number;
  readonly photo: string;
  readonly id_model: string;
  readonly id_provider: string;
}

export interface ICreateProduct {
  readonly id_categories: string | string[],
  readonly title: string;
  readonly description: string;
  readonly manufacturer: string;
  readonly price: number | null;
}

