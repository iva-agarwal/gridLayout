import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const Chart2: React.FC = () => {
  const chartRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to generate random data for the pie chart
  const generateRandomData = () => {
    const categories = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    return categories.map((category) => ({
      value: Math.floor(Math.random() * 100),
      name: category,
    }));
  };

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    color: [
        '#20477A', 
        '#1B3C64',
        '#265D84',
        '#3A729F',
        '#4176A3',
        '#4A84A7',
        '#A0C4D6', 
    ],
    series: [
      {
        name: 'Random Data',
        type: 'pie',
        radius: '50%', 
        data: generateRandomData(),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const resizeChart = () => {
    if (chartRef.current) {
      chartRef.current.getEchartsInstance().resize();
    }
  };

  // Resize observer to handle changes in the container size
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

export default Chart2;
