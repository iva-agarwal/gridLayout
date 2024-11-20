import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

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
  const chartRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to resize chart
  const resizeChart = () => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().resize();
    }
  };

  useEffect(() => {
    const observer = new ResizeObserver(resizeChart);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
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
