import axios from 'axios'

const defaultApiUrl =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/'
const defaultApiConfig = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}
const defaultSuggestionsCount = 5

const CancelToken = axios.CancelToken
let cancel
export default class {
  constructor(token, apiUrl = defaultApiUrl, apiConfig = defaultApiConfig) {
    this.apiUrl = apiUrl
    this.token = token
    this.apiConfig = apiConfig
    this.apiConfig.Authorization = `Token ${token}`
  }

  getSuggestions(type, query) {
    if (!type) {
      throw new Error(
        "Не указан тип подсказки ('party' для организаций, 'address' для адреса)"
      )
    }
    if (cancel !== undefined) {
      cancel()
    }
    return new Promise((resolve, reject) => {
      axios
        .post(this.apiUrl + type, query, {
          headers: this.apiConfig,
          cancelToken: new CancelToken(function executor(c) {
            cancel = c
          })
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('post Request canceled')
          }
          reject(error)
        })
    })
  }

  getAddress(data, suggestionsCount = defaultSuggestionsCount) {
    const query = {
      count: suggestionsCount,
      query: data
    }
    return new Promise((resolve, reject) => {
      this.getSuggestions('address', query)
        .then((data) => {
          resolve(data.data.suggestions)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getCompany(data, suggestionsCount = defaultSuggestionsCount) {
    const query = {
      count: suggestionsCount,
      query: data
    }
    return new Promise((resolve, reject) => {
      this.getSuggestions('party', query)
        .then((data) => {
          resolve(data.data.suggestions)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
