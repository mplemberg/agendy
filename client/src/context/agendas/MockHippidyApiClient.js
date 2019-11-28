import HippidyApiClient from "./HippidyApiClient";

export default class MockHippidyApiClient {
  constructor(serverUrl) {
    this.apiClient = new HippidyApiClient(serverUrl);
  }

  async getAgenda(id) {
    return this.apiClient.getDraftAgenda(id);
  }

  async createAgenda(agenda) {
    agenda.saveDateTime = "today";
    agenda.viewId = "v2";
    agenda.editId = "e2";
    return this.apiClient.createAgenda(agenda);
  }
}
