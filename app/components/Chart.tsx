import React, { useEffect, useRef } from 'react';
import ReactECharts, { EChartsInstance } from 'echarts-for-react';

interface ChartProps {
  config: {
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
  };
}

const Chart: React.FC<ChartProps> = ({ config }) => {
  const chartRef = useRef<ReactECharts | null>(null); // Typed reference for ReactECharts
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to resize chart
  const resizeChart = () => {
    if (chartRef.current) {
      const echartsInstance: EChartsInstance = chartRef.current.getEchartsInstance();
      echartsInstance.resize();
    }
  };

  useEffect(() => {
    const container = containerRef.current; // Store ref value in variable
    const observer = new ResizeObserver(() => resizeChart());
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
      <ReactECharts
        ref={chartRef}
        option={config}  
        notMerge={true}
        lazyUpdate={true}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default Chart;
