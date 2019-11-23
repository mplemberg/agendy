import axios from "axios";

export default class HippidyApiClient {
  constructor(serverUrl) {
    this.baseUrl = serverUrl;
  }

  async getAgenda(id) {
    return await axios.get(`${this.baseUrl}/agendas/${id}`);
  }

  async createAgenda(agenda) {
    return await axios.post(`${this.baseUrl}/agendas`, agenda);
  }
}
