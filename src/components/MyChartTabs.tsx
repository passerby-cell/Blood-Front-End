import React, { useEffect, useRef, useState } from "react";
import { Box, Tab, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import * as echarts from "echarts";
import useResizeObserver from "@/utils/useResizeObserver";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return <></>;
};

const bmiData = [
  { name: "<18.5", value: 10 },
  { name: "18.5-24.9", value: 45 },
  { name: "25-29.9", value: 30 },
  { name: "30-34.9", value: 20 },
  { name: ">35", value: 15 },
];

const ethnicityData = [
  { name: "Caucasian", value: 60 },
  { name: "African American", value: 20 },
  { name: "Asian", value: 10 },
  { name: "Hispanic", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MyChartTabs: React.FC = () => {
  const pieChartRefOne = useRef<HTMLDivElement | null>(null);
  const dimensions = useResizeObserver(pieChartRefOne);
  const options = {
    title: {
      text: "BMI",

      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      top: "bottom",
    },

    series: [
      {
        name: "BMI",
        type: "pie",
        radius: ["5%", "60%"],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: "<18.5" },
          { value: 38, name: "18.5-24.9" },
          { value: 32, name: "25-29.9" },
          { value: 30, name: "30-34.9" },
          { value: 28, name: ">35" },
        ],
      },
    ],
  };
  useEffect(() => {
    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chartOne = echarts.init(pieChartRefOne.current);

    // 设置图表实例的配置项和数据
    chartOne.setOption(options);
    // 组件卸载
    return () => {
      // myChart.dispose() 销毁实例。实例销毁后无法再被使用
      chartOne.dispose();
    };
  }, [dimensions]);
  const handleChange = (val: string) => {
    const chartOne = echarts.init(pieChartRefOne.current);

    if (val === "BMI") {
      const chartOne = echarts.init(pieChartRefOne.current);
      options.title.text = "BMI";
      options.series[0].data = bmiData;
      options.series[0].name = "BMI";

      chartOne.setOption(options);
    } else {
      const chartOne = echarts.init(pieChartRefOne.current);
      options.title.text = "ETHNICITY";
      options.series[0].name = "ETHNICITY";
      options.series[0].data = [
        { value: 60, name: "Caucasian" },
        { value: 20, name: "African American" },
        { value: 10, name: "Asian" },
        { value: 10, name: "Hispanic" },
      ];
      chartOne.setOption(options);
    }
  };
  return (
    <>
      <div className="flex flex-row">
        <Tabs
          defaultValue="BMI"
          className="h-96 w-full basis-1/6 border-r-2"
          onValueChange={handleChange}
        >
          <TabsList className=" h-full bg-white flex-col float-right">
            <TabsTrigger value="BMI">BMI</TabsTrigger>
            <TabsTrigger value="ETHNICITY">ETHNICITY</TabsTrigger>
          </TabsList>
          <TabsContent value="BMI"></TabsContent>
          <TabsContent value="ETHNICITY"></TabsContent>
        </Tabs>
        <div className=" w-full basis-3/4" ref={pieChartRefOne}></div>
      </div>
    </>
  );
};

export default MyChartTabs;
