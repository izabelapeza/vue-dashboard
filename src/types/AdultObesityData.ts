interface Datum {
  "ID State": string;
  State: string;
  "ID Year": number;
  Year: string;
  "Adult Obesity": number;
  "Slug State": string;
}

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

interface Data {
  data: Datum[];
  source: Source[];
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

export default interface AdultObesityData {
  data: Data;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: string;
}
