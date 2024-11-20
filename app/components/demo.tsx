'use client'
import type { GridStackOptions } from "gridstack";
import React, { useState, useEffect } from "react";
import "./demo.css";
import {
  useGridstackContext,
  GridstackProvider,
  GridstackGrid,
  GridstackItemComponent,
} from "./";
import Chart from "./Chart";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface ChartConfig {
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

interface Coordinates {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface FirestoreData {
  componentData: ChartConfig;
  coordinates: Coordinates;
}

export const GridstackDemo = () => {
  return (
    <GridstackProvider>
      <GridDemo />
    </GridstackProvider>
  );
};

const GridDemo = () => {
  const { grid, getItemRefFromListById } = useGridstackContext();
  const [data, setData] = useState<FirestoreData[] | null>(null);

  const fetchData = async () => {
    try {
      const docRef = doc(db, "components", "charts");
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        const documentData = docSnap.data();  
        if (documentData) {
          setData(documentData.data as FirestoreData[]);
        } 
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []); 

  const gridOptions: GridStackOptions = {
    cellHeight: 80,
    float: true,
    margin: 5,
    draggable: { handle: ".grid-stack-item-content" },
    resizable: { handles: "se" },
    columnOpts: {
      layout: "compact",
      breakpointForWindow: true,
      breakpoints: [
        { w: 700, c: 1 },
        { w: 850, c: 3 },
        { w: 950, c: 6 },
        { w: 1100, c: 8 },
      ],
    },
  };

  return (
    <>
      {data ? (
        <GridstackGrid options={gridOptions}>
          {data.map((item, index) => (
            <GridstackItemComponent
              key={index}
              id={`item-${index}`}
              initOptions={item.coordinates} 
            >
              <Chart config={item.componentData} /> 
            </GridstackItemComponent>
          ))}
        </GridstackGrid>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
