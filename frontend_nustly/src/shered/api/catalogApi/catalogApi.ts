export interface ICatalog {
  id: string;
  title: string;
  visibility: boolean;
  photo: string;
}

export interface ICreateCatalog {
  title: string;
  visibility: boolean;
}