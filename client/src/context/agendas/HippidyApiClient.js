import axios from "axios";

export default class HippidyApiClient {
  //THIS IS JUST A TEST TO SHOW THE API WORKS

  constructor(serverUrl) {
    this.baseUrl = serverUrl;
  }

  async getAgenda(id) {
    return await axios.get(`${this.baseUrl}/api/agendas/${id}`);
  }

  async createAgenda(agenda) {
    return await axios.post(`${this.baseUrl}/api/agendas`, agenda);
  }
}
