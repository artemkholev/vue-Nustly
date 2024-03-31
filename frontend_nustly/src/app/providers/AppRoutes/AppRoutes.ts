import { AppPages } from '../router'

interface IRoute<T extends object = {}> {
  name: string
  params: T
}

export class AppRoutes {
  private constructor() {}

  static getAbout() {
    return getRoute(AppPages.about, {})
  }

  static getAgreement() {
    return getRoute(AppPages.agreement, {})
  }

  static getArticles() {
    return getRoute(AppPages.articles, {})
  }
  static getAuth() {
    return getRoute(AppPages.auth, {})
  }
  static getBucket() {
    return getRoute(AppPages.bucket, {})
  }
  static getCatalog() {
    return getRoute(AppPages.catalog, {})
  }
  static getFavorites() {
    return getRoute(AppPages.favorites, {})
  }
  static getMain() {
    return getRoute(AppPages.main, {})
  }
  static getOrders() {
  return getRoute(AppPages.orders, {})
}
  static getPolitics() {
  return getRoute(AppPages.politics, {})
  }
  static getProducts() {
  return getRoute(AppPages.products, {})
  }
  static getRegistr() {
  return getRoute(AppPages.registr, {})
  }
  static getVacancy() {
  return getRoute(AppPages.vacancy, {})
}
}

// TODO необязательный 2й параметр
function getRoute<T extends object = {}>(name: string, params: T): IRoute<T> {
  return {
    name,
    params
  }
}