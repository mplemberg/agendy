import axios from "axios";

export default class HippidyApiClient {
  constructor(serverUrl) {
    this.baseUrl = serverUrl;
  }

  async getDraftAgenda(code) {
    return await axios.get(`${this.baseUrl}/api/agendas/edit/${code}`);
  }

  async getPublishedAgenda(code) {
    return await axios.get(`${this.baseUrl}/api/agendas/${code}`);
  }

  async saveDraftAgenda(agenda) {
    return await axios.put(
      `${this.baseUrl}/api/agendas/edit/${agenda.id}`,
      agenda
    );
  }

  async publishDraftAgenda(id) {
    return await axios.put(`${this.baseUrl}/api/agendas/publish/${id}`);
  }

  async createAgenda(agenda) {
    return await axios.post(`${this.baseUrl}/api/agendas`, agenda);
  }
}
