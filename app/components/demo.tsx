'use client'
import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  useGridstackContext,
  GridstackProvider,
  GridstackGrid,
  GridstackItemComponent,
} from "./";
import Chart from "./Chart";
import type { GridStackOptions } from "gridstack";
import "./demo.css";
import { FirestoreData } from "../types"; 

export const GridstackDemo = () => {
  return (
    <GridstackProvider>
      <GridDemo />
    </GridstackProvider>
  );
};

const GridDemo = () => {
  const { grid } = useGridstackContext();
  const [data, setData] = useState<FirestoreData[] | null>(null);
  const [modifiedData, setModifiedData] = useState<FirestoreData[] | null>(null);

  const fetchData = async () => {
    try {
      const docRef = doc(db, "components", "charts");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const documentData = docSnap.data();
        if (documentData) {
          setData(documentData.data as FirestoreData[]);
          setModifiedData(documentData.data as FirestoreData[]); // To track updates
        }
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  // Save updated coordinates to Firestore
const saveChanges = async () => {
  if (modifiedData) {
    try {
      const docRef = doc(db, "components", "charts");

      const jsonData = modifiedData.map(item => ({
        ...item, // Keep the rest of the item data
        coordinates: { 
          x: item.coordinates.x,
          y: item.coordinates.y,
          w: item.coordinates.w,
          h: item.coordinates.h
        },
      }));

      // Save only the necessary data to Firestore
      await updateDoc(docRef, { data: jsonData });
      alert("Changes saved ");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  }
};

  // Track resize events
  useEffect(() => {
    if (grid) {
      grid.on("resizestop", (event, element) => {
        const itemId = element.getAttribute("data-gs-id");
        if (itemId && modifiedData) {
          const index = parseInt(itemId.replace("item-", ""));
          const item = modifiedData[index];
          if (item) {
            const node = element.gridstackNode;
            if (node) {
              item.coordinates = {
                x: node.x ?? 0, 
                y: node.y ?? 0, 
                w: node.w ?? 1,
                h: node.h ?? 1, 
              };
              setModifiedData([...modifiedData]); // Trigger re-render
            }
          }
        }
      });
    }
  }, [grid, modifiedData]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const gridOptions: GridStackOptions = {
    cellHeight: 80,
    float: true,
    margin: 5,
    draggable: { handle: ".grid-stack-item-content" },
    resizable: { handles: "se" },
  };

  return (
    <>
      {data ? (
        <>
         <button
  onClick={saveChanges}
  className="m-5 px-6 py-3 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-900  transition-colors duration-300 focus:outline-none "
>
  Save Changes
</button>

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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
