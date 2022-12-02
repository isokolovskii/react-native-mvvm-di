import type { CurrenciesApiClient } from './api'
import type { CurrenciesDataSource } from './data'

export interface CurrenciesModule {
  apiClient: CurrenciesApiClient
  dataSource: CurrenciesDataSource
}

interface CurrenciesModuleInit {
  ApiClient: {
    new (): CurrenciesModule['apiClient']
  }
  DataSource: {
    new (): CurrenciesModule['dataSource']
  }
}

export class CurrenciesModuleImpl implements CurrenciesModule {
  private ApiClient: CurrenciesModuleInit['ApiClient']
  private _apiClient: CurrenciesApiClient | null = null
  private DataSource: CurrenciesModuleInit['DataSource']
  private _dataSource: CurrenciesDataSource | null = null

  get apiClient() {
    if (!this._apiClient) {
      this._apiClient = new this.ApiClient()
    }

    return this._apiClient
  }

  get dataSource() {
    if (!this._dataSource) {
      this._dataSource = new this.DataSource()
    }

    return this._dataSource
  }

  private static _sharedInstance: CurrenciesModuleImpl | null = null
  private static initConfig: CurrenciesModuleInit | null = null

  static get sharedInstance() {
    if (!this.initConfig) {
      throw new Error()
    }

    if (!this._sharedInstance) {
      this._sharedInstance = new CurrenciesModuleImpl(this.initConfig)
    }

    return this._sharedInstance
  }

  static init = (config: CurrenciesModuleInit) => {
    this.shutdown()
    this.initConfig = config
  }

  static shutdown = () => {
    if (this._sharedInstance) {
      this._sharedInstance = null
    }
  }

  private constructor({ ApiClient, DataSource }: CurrenciesModuleInit) {
    this.ApiClient = ApiClient
    this.DataSource = DataSource
  }
}
