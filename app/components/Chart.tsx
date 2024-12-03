import React, { useEffect, useRef, useState } from 'react';
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
  const chartRef = useRef<ReactECharts | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const observer = new ResizeObserver(() => {
        const { clientWidth, clientHeight } = container;
        if (clientWidth > 0 && clientHeight > 0) {
          setIsReady(true);
        }
        if (chartRef.current) {
          const echartsInstance: EChartsInstance = chartRef.current.getEchartsInstance();
          echartsInstance.resize();
        }
      });
      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div ref={containerRef} style={{ height: '100%', width: '100%' }}>
      {isReady && (
        <ReactECharts
          ref={chartRef}
          option={config}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: '100%', width: '100%' }}
        />
      )}
    </div>
  );
};


export default Chart;
