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
  getDrugOverdose(): Promise<any> {
    return http.get(
      "?drilldowns=Nation&measures=Drug%20Overdose%20Death%20Rate%20Per%20100,000%20Age-Adjusted&year=latest"
    );
  }
  getOpioidOverdose(): Promise<any> {
    return http.get(
      "?drilldowns=Nation&measures=Opioid%20Overdose%20Death%20Rate%20Per%20100,000%20Age-Adjusted&year=latest"
    );
  }
}

export default new DataService();
