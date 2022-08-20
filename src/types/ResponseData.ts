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
interface ObesityData {
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
interface DiabetesData {
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
interface AdultSmokingData {
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
