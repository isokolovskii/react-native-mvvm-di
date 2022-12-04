import type { CurrenciesApiClient } from './api'
import type { CurrenciesDataSource } from './data'

interface CurrenciesModuleInit {
  ApiClient: {
    new (): CurrenciesModule['apiClient']
  }
  DataSource: {
    new (): CurrenciesModule['dataSource']
  }
}

export interface CurrenciesModule {
  apiClient: CurrenciesApiClient
  dataSource: CurrenciesDataSource
  init: (config: CurrenciesModuleInit) => void
}

export class CurrenciesModuleImpl implements CurrenciesModule {
  private ApiClient!: CurrenciesModuleInit['ApiClient']
  private _apiClient: CurrenciesApiClient | null = null

  get apiClient() {
    if (!this._apiClient) {
      this._apiClient = new this.ApiClient()
    }

    return this._apiClient
  }

  private DataSource!: CurrenciesModuleInit['DataSource']
  private _dataSource: CurrenciesDataSource | null = null

  get dataSource() {
    if (!this._dataSource) {
      this._dataSource = new this.DataSource()
    }

    return this._dataSource
  }

  init = ({ ApiClient, DataSource }: CurrenciesModuleInit) => {
    this._apiClient = null
    this.ApiClient = ApiClient

    this._dataSource = null
    this.DataSource = DataSource
  }

  private static _sharedInstance: CurrenciesModuleImpl | null = null

  static get sharedInstance() {
    if (!CurrenciesModuleImpl._sharedInstance) {
      CurrenciesModuleImpl._sharedInstance = new CurrenciesModuleImpl()
    }

    return CurrenciesModuleImpl._sharedInstance
  }
}
