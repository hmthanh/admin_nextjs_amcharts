export interface Series {
  date: number;
  value: number;
}

export interface IBandwidthType {
  error: number;
  msg: string;
  data: Series[];
}

export interface UsageData {
  date: number;
  value: number;
}

export interface IUsageDataType {
  error: number;
  msg: string;
  data: any[];
}
