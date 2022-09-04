import http from "@/http-common";

class DataService {
  getAdultObesityData(year = ""): Promise<any> {
    return http.get(`?drilldowns=State&measure=Adult Obesity&year=${year}`);
  }
  getDiabetesData(year = ""): Promise<any> {
    return http.get(
      `?drilldowns=State&measure=Diabetes Prevalence&year=${year}`
    );
  }
  getAdultSmokingData(year = ""): Promise<any> {
    return http.get(`?drilldowns=State&measure=Adult Smoking&year=${year}`);
  }
  getDrugOverdose(year = ""): Promise<any> {
    return http.get(
      `?drilldowns=Nation&measures=Drug%20Overdose%20Death%20Rate%20Per%20100,000%20Age-Adjusted&year=${year}`
    );
  }
  getOpioidOverdose(year = ""): Promise<any> {
    return http.get(
      `?drilldowns=Nation&measures=Opioid%20Overdose%20Death%20Rate%20Per%20100,000%20Age-Adjusted&year=${year}`
    );
  }
  getExcessiveDrinking(): Promise<any> {
    return http.get("?drilldowns=State&measures=Excessive%20Drinking");
  }
  getAlcoholDrivingDeaths(): Promise<any> {
    return http.get(
      "?drilldowns=State&measures=Alcohol-Impaired%20Driving%20Deaths"
    );
  }
  getViolentCrime(year = ""): Promise<any> {
    return http.get(`?drilldowns=State&measure=Violent%20Crime&year=${year}`);
  }
  getHomicides(year = ""): Promise<any> {
    return http.get(`?drilldowns=State&measure=Homicides&year=${year}`);
  }
}

export default new DataService();
