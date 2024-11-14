import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const Chart: React.FC = () => {
  const chartRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateRandomData = () => {
    return Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
  };

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Random Data',
        type: 'line',
        data: generateRandomData(),
        smooth: true,
        areaStyle: {},
        itemStyle: {
          color: '#FFAA60',
        },
      },
    ],
  };

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
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default Chart;
