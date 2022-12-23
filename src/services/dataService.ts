import http from "@/http-common";
import {
  AdultObesityResponse,
  DiabetesResponse,
  AdultSmokingResponse,
  DrugOverdoseResponse,
  OpioidOverdoseResponse,
  ExcessiveDrinkingResponse,
  AlcoholDrivingDeathsResponse,
  ViolentCrimeResponse,
  HomicidesResponse,
} from "@/types/ResponseData";

class DataService {
  getAdultObesityData(year = ""): Promise<AdultObesityResponse> {
    return http.get(`?drilldowns=State&measure=Adult Obesity&year=${year}`);
  }
  getDiabetesData(year = ""): Promise<DiabetesResponse> {
    return http.get(
      `?drilldowns=State&measure=Diabetes Prevalence&year=${year}`
    );
  }
  getAdultSmokingData(year = ""): Promise<AdultSmokingResponse> {
    return http.get(`?drilldowns=State&measure=Adult Smoking&year=${year}`);
  }
  getDrugOverdose(year = ""): Promise<DrugOverdoseResponse> {
    return http.get(
      `?drilldowns=Nation&measures=Drug%20Overdose%20Death%20Rate%20Per%20100,000%20Age-Adjusted&year=${year}`
    );
  }
  getOpioidOverdose(year = ""): Promise<OpioidOverdoseResponse> {
    return http.get(
      `?drilldowns=Nation&measures=Opioid%20Overdose%20Death%20Rate%20Per%20100,000%20Age-Adjusted&year=${year}`
    );
  }
  getExcessiveDrinking(): Promise<ExcessiveDrinkingResponse> {
    return http.get("?drilldowns=State&measures=Excessive%20Drinking");
  }
  getAlcoholDrivingDeaths(): Promise<AlcoholDrivingDeathsResponse> {
    return http.get(
      "?drilldowns=State&measures=Alcohol-Impaired%20Driving%20Deaths"
    );
  }
  getViolentCrime(year = ""): Promise<ViolentCrimeResponse> {
    return http.get(`?drilldowns=State&measure=Violent%20Crime&year=${year}`);
  }
  getHomicides(year = ""): Promise<HomicidesResponse> {
    return http.get(`?drilldowns=State&measure=Homicides&year=${year}`);
  }
}

export default new DataService();
