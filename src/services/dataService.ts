import http from "@/http-common";

class DataService {
  getAdultObesityData(): Promise<any> {
    return http.get("?drilldowns=State&measure=Adult Obesity&year=latest");
  }
}

export default new DataService();
