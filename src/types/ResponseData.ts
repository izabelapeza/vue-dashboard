interface Annotations {
  source_name: string;
  source_description: string;
  dataset_name: string;
  dataset_link: string;
  topic: string;
  subtopic: string;
}

interface Source {
  measures: string[];
  annotations: Annotations;
  name: string;
  substitutions: any[];
}

interface Headers {
  "cache-control": string;
  "content-language": string;
  "content-type": string;
  "last-modified": string;
}

interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

interface Env {
  FormData?: any;
}

interface Headers2 {
  Accept: string;
}

interface Config {
  transitional: Transitional;
  transformRequest: any[];
  transformResponse: any[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: Headers2;
  baseURL: string;
  method: string;
  url: string;
}

interface Response<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: string;
}

// obesity
export interface ObesityData {
  data: {
    "ID State": string;
    State: string;
    "ID Year": number;
    Year: string;
    "Adult Obesity": number;
    "Slug State": string;
  }[];
  source: Source[];
}

export type AdultObesityResponse = Response<ObesityData>;

// diabetes
export interface DiabetesData {
  data: {
    "ID State": string;
    State: string;
    "ID Year": number;
    Year: string;
    "Diabetes Prevalence": number;
    "Slug State": string;
  }[];
  source: Source[];
}

export type DiabetesResponse = Response<DiabetesData>;

// adult smoking
export interface AdultSmokingData {
  data: {
    "ID State": string;
    State: string;
    "ID Year": number;
    Year: string;
    "Adult Smoking": number;
    "Slug State": string;
  }[];
  source: Source[];
}

export type AdultSmokingResponse = Response<AdultSmokingData>;

// drug overdose death rate
export interface DrugOverdoseData {
  data: {
    "Drug Overdose Death Rate Per 100,000 Age-Adjusted": number;
    "ID Nation": string;
    "ID Year": number;
    Nation: string;
    "Slug Nation": string;
    Year: string;
  }[];
  source: Source[];
}

export type DrugOverdoseResponse = Response<DrugOverdoseData>;

// opioid overdose death rate
export interface OpioidOverdoseData {
  data: {
    "Opioid Overdose Death Rate Per 100,000 Age-Adjusted": number;
    "ID Nation": string;
    "ID Year": number;
    Nation: string;
    "Slug Nation": string;
    Year: string;
  }[];
  source: Source[];
}

export type OpioidOverdoseResponse = Response<OpioidOverdoseData>;

// excessive drinking
export interface ExcessiveDrinkingData {
  data: {
    "Excessive Drinking": number;
    "ID State": string;
    "ID Year": number;
    "Slug Nation": string;
    Year: string;
  }[];
  source: Source[];
}

export type ExcessiveDrinkingResponse = Response<ExcessiveDrinkingData>;

// alcohol impaired driving deaths
export interface AlcoholDrivingDeathsData {
  data: {
    "Alcohol-Impaired Driving Deaths": number;
    "ID State": string;
    "ID Year": number;
    "Slug Nation": string;
    Year: string;
  }[];
  source: Source[];
}

export type AlcoholDrivingDeathsResponse = Response<AlcoholDrivingDeathsData>;

// violent crime
export interface ViolentCrimeData {
  data: {
    "Violent Crime": number;
    "ID State": string;
    State: string;
    "Slug Nation": string;
    "ID Year": number;
    Year: string;
  }[];
  source: Source[];
}

export type ViolentCrimeResponse = Response<ViolentCrimeData>;

// homicides
export interface HomicidesData {
  data: {
    Homicides: number;
    "ID State": string;
    State: string;
    "Slug Nation": string;
    "ID Year": number;
    Year: string;
  }[];
  source: Source[];
}

export type HomicidesResponse = Response<HomicidesData>;
