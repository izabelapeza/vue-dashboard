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

export interface AdultObesityResponse {
  data: ObesityData;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: string;
}

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

export interface DiabetesResponse {
  data: DiabetesData;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: string;
}

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

export interface AdultSmokingResponse {
  data: AdultSmokingData;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: string;
}

// drug overdose reath rate
interface DrugOverdoseData {
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

export interface DrugOverdoseResponse {
  data: DrugOverdoseData;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: string;
}

// opioid overdose reath rate
interface OpioidOverdoseData {
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

export interface OpioidOverdoseResponse {
  data: OpioidOverdoseData;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: string;
}
