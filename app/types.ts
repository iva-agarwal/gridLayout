// src/types.ts

export interface ChartConfig {
    series: Array<{
      type: string;
      smooth: boolean;
      name: string;
      data: number[];
    }>;
    xAxis: {
      data: string[];
      type: string;
    };
    yAxis: {
      type: string;
    };
    tooltip: {
      trigger: string;
    };
  }
  
  export interface Coordinates {
    desktop: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
    mobile: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  }
  
  export interface FirestoreData {
    componentData: ChartConfig;
    coordinates: Coordinates;
  }
  