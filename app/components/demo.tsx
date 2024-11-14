"use client"; // demo.tsx
import type { GridStackOptions } from "gridstack";
import * as React from "react";
import "./demo.css";
import {
  useGridstackContext,
  GridstackProvider,
  GridstackGrid,
  GridstackItemComponent,
} from "./";
import Chart2 from "./Chart2";
import Chart from "./Chart";

export const GridstackDemo = () => {
  return (
    <GridstackProvider>
      <GridDemo />
    </GridstackProvider>
  );
};

const GridDemo = () => {
  const { grid, getItemRefFromListById } = useGridstackContext();

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
    <GridstackGrid options={gridOptions}>
      <GridstackItemComponent
        id="item1"
        initOptions={{ x: 0, y: 0, w: 4, h: 4 }}
      >
        <Chart />
      </GridstackItemComponent>

      <GridstackItemComponent
        id="item2"
        initOptions={{ x: 4, y: 0, w: 8, h: 5 }}
      >
        <Chart2 />
      </GridstackItemComponent>

      <GridstackItemComponent
        id="item3"
        initOptions={{ x: 0, y: 4, w: 4, h: 6 }}
      >
        <Chart2 />{" "}
      </GridstackItemComponent>

      <GridstackItemComponent
        id="item4"
        initOptions={{ x: 4, y: 5, w: 4, h: 5 }}
      >
        <Chart />
      </GridstackItemComponent>

      <GridstackItemComponent
        id="item5"
        initOptions={{ x: 8, y: 5, w: 4, h: 5 }}
      >
        <Chart />
      </GridstackItemComponent>
    </GridstackGrid>
  );
};
