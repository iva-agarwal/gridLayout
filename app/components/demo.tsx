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
import { Smartphone, Monitor, Edit3 } from "lucide-react";

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const isMobileScreen = window.innerWidth <= 768; 
    setViewMode(isMobileScreen ? 'mobile' : 'desktop');
  }, []);
  

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "components", "charts");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const documentData = docSnap.data();
        if (documentData) {
          const processedData = (documentData.data as FirestoreData[]).map(item => ({
            ...item,
            coordinates: {
              desktop: item.coordinates.desktop || item.coordinates,
              mobile: item.coordinates.mobile || { x: 0, y: 0, w: 6, h: 4 }
            }
          }));

          setData(processedData);
          setModifiedData(processedData);
        }
      }
    } catch (error) {
      console.error("Error getting document:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveChanges = async () => {
    if (modifiedData) {
      try {
        const docRef = doc(db, "components", "charts");
        
        const jsonData = modifiedData.map(item => ({
          ...item,
          coordinates: {
            desktop: {
              x: item.coordinates.desktop.x,
              y: item.coordinates.desktop.y,
              w: item.coordinates.desktop.w,
              h: item.coordinates.desktop.h,
            },
            mobile: {
              x: item.coordinates.mobile.x,
              y: item.coordinates.mobile.y,
              w: item.coordinates.mobile.w,
              h: item.coordinates.mobile.h,
            }
          },
        }));

        await updateDoc(docRef, { data: jsonData });
        alert("Changes saved");
        setIsEditMode(false); // Exit edit mode after saving
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    }
  };

  // Refetch data when view mode changes
  useEffect(() => {
    fetchData();
  }, [viewMode]);

  // Enable/disable grid editing
  useEffect(() => {
    if (grid) {
      grid.enableMove(isEditMode);
      grid.enableResize(isEditMode);
    }
  }, [grid, isEditMode]);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const gridOptions: GridStackOptions = {
    cellHeight: viewMode === 'mobile' ? 60 : 80,
    float: true,
    margin: 5,
    draggable: { handle: ".grid-stack-item-content" },
    resizable: { handles: "se" }
  };

  // Handle view mode change
  const handleViewModeChange = (mode: 'desktop' | 'mobile') => {
    setViewMode(mode);
  };

  return (
    <div>

<div className="flex items-center justify-between gap-4 mb-5 p-5">
  <button
    onClick={isEditMode ? saveChanges : () => setIsEditMode(true)}
    className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none flex items-center gap-2"
  >
    {isEditMode ? "Save Changes" : <>
      <Edit3 className="w-5 h-5" /> Edit Mode
    </>}
  </button>

  {isEditMode && ( // Render view mode buttons only in edit mode
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => handleViewModeChange('desktop')}
        className={`p-2 rounded-lg transition-colors duration-300 ${
          viewMode === 'desktop'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Monitor className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleViewModeChange('mobile')}
        className={`p-2 rounded-lg transition-colors duration-300 ${
          viewMode === 'mobile'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Smartphone className="w-5 h-5" />
      </button>
    </div>
  )}
</div>

      <div
        className={`
          ${viewMode === 'mobile' ? 'max-w-[375px] mx-auto  rounded-xl shadow-lg overflow-y-scroll bg-white' : ''}
        `}
        style={{
          height: viewMode === 'mobile' ? '' : 'auto', // Optionally mimic mobile viewport height
        }}
      >
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading-spinner">Loading...</span>
          </div>
        ) : data ? (
         
          <div>
            <GridstackGrid options={gridOptions}>
              {data.map((item, index) => (
                <GridstackItemComponent
                  key={`${viewMode}-${index}`}
                  id={`item-${index}`}
                  initOptions={
                    viewMode === 'mobile'
                      ? item.coordinates.mobile
                      : item.coordinates.desktop
                  }
                >
                  <Chart config={item.componentData} />
                </GridstackItemComponent>
              ))}
            </GridstackGrid>
          </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
};

export default GridDemo;
