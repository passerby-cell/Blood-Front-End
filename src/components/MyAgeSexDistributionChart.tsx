import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";
import useResizeObserver from "@/utils/useResizeObserver.ts";
import { stack } from "d3-shape";
interface AgeSexDistributionData {
  ageRange: string;
  male: number;
  female: number;
}

const data: AgeSexDistributionData[] = [
  { ageRange: "0-10", male: 5, female: 4 },
  { ageRange: "10-20", male: 10, female: 8 },
  { ageRange: "20-30", male: 15, female: 12 },
  { ageRange: "30-40", male: 12, female: 14 },
  { ageRange: "40-50", male: 10, female: 10 },
  { ageRange: "50-60", male: 8, female: 9 },
  { ageRange: "60-70", male: 6, female: 7 },
  { ageRange: "70-80", male: 4, female: 5 },
  { ageRange: ">80", male: 2, female: 3 },
];

const MyAgeSexDistributionChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useResizeObserver(chartRef);

  const options = {
    brush: {
      toolbox: ["clear"],
      xAxisIndex: 0,
    },
    toolbox: {
      feature: {
        magicType: {
          type: ["stack"],
        },
        dataView: {},
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Male", "Female"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        data: [
          "0-10",
          "10-20",
          "20-30",
          "30-40",
          "40-50",
          "50-60",
          "60-70",
          "70-80",
          ">80",
        ],
      },
    ],
    series: [
      {
        name: "Male",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [-120, -102, -141, -174, -190, -150, -120, -15, -10],
      },
      {
        name: "Female",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "right",
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 190, 130, 110, 12, 56],
      },
    ],
  };

  useEffect(() => {
    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chart = echarts.init(chartRef.current);

    // 设置图表实例的配置项和数据
    chart.setOption(options);

    // 组件卸载
    return () => {
      // myChart.dispose() 销毁实例。实例销毁后无法再被使用
      chart.dispose();
    };
  }, [dimensions]);

  return (
    // 把图表封装单独放入一个组件中
    <div className="h-96 w-full shrink" ref={chartRef}></div>
  );
};

export default MyAgeSexDistributionChart;
