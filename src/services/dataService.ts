import http from "@/http-common";

class DataService {
  getAdultObesityData(): Promise<any> {
    return http.get("?drilldowns=State&measure=Adult Obesity&year=latest");
  }
  getDiabetesData(): Promise<any> {
    return http.get(
      "?drilldowns=State&measure=Diabetes Prevalence&year=latest"
    );
  }
  getAdultSmokingData(): Promise<any> {
    return http.get("?drilldowns=State&measure=Adult Smoking&year=latest");
  }
  getHaventSeenDoctor(): Promise<any> {
    return http.get(
      "?drilldowns=Nation&measures=Adults Who Haven't Seen a Doctor in the Past 12 Months Due to Cost&year=latest"
    );
  }
}

export default new DataService();
