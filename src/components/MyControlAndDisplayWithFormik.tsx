import React, { useEffect, useRef, useState } from "react";
import "@/components/css/MyControlAndDisplay.sass";
import TuneIcon from "@mui/icons-material/Tune";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { CardContent } from "@mui/material";
import { ConfigProvider, DatePicker } from "antd";
import { Tag } from "antd";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import * as echarts from "echarts";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  FormikErrors,
  useFormik,
} from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useResizeObserver from "@/utils/useResizeObserver";

dayjs.extend(customParseFormat);

const BMI = [
  {
    label: "Underweight<18",
    value: "Underweight",
  },
  {
    label: "Normal(18-24.9)",
    value: "Normal",
  },
  {
    label: "Overweight(25-29.9)",
    value: "Overweight",
  },
  {
    label: "Obesity>30)",
    value: "Obesity",
  },
];

const Ethnicity = [
  {
    label: "White British",
    value: "White British",
  },
  {
    label: "Other White Background",
    value: "Other White Background",
  },
  {
    label: "Black Caribbean",
    value: "Black Caribbean",
  },
  {
    label: "Other Asian Background",
    value: "Other Asian Background",
  },
  {
    label: "Other Chinese",
    value: "Other Chinese",
  },
  {
    label: "Not Stated",
    value: "Not Stated",
  },
  {
    label: "White Irish",
    value: "White Irish",
  },
  {
    label: "Asian Indian",
    value: "Asian Indian",
  },
  {
    label: "Asian Pakistani",
    value: "Asian Pakistani",
  },
  {
    label: "Mixed White and Asian",
    value: "Mixed White and Asian",
  },
  {
    label: "Black African",
    value: "Black African",
  },
  {
    label: "Mixed White and Black African",
    value: "Mixed White and Black African",
  },
  {
    label: "Other Black Background",
    value: "Other Black Background",
  },
  {
    label: "Mixed White and Black Caribbean",
    value: "Mixed White and Black Caribbean",
  },
  {
    label: "Asian Bangladeshi",
    value: "Asian Bangladeshi",
  },
  {
    label: "Other Mixed Background",
    value: "Other Mixed Background",
  },
];
interface LineChartColorProps {
  WBC: string;
  HGB: string;
  RBC: string;
}
const lineChartColor: LineChartColorProps = {
  WBC: "#2db7f5",
  HGB: "#ff9800",
  RBC: "#4caf50",
};
const ControlAndDisplay: React.FC = () => {
  const lineChartRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useResizeObserver(lineChartRef);

  const options = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["WBC"],
    },
    grid: {
      left: "8%",
      right: "6%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04",
        "2024-05",
        "2024-06",
        "2024-07",
        "2024-08",
        "2024-09",
      ],
    },
    yAxis: [
      {
        type: "value",
        name: "RBC(x10^12/L)", //单位
        nameLocation: "center", // (单位个也就是在在Y轴的最顶部)
        //单位的样式设置
        nameTextStyle: {
          padding: [0, 0, 35, 0], //间距分别是 上 右 下 左
        },
      },
    ],
    series: [
      {
        name: "WBC",
        type: "line",
        data: [120, 132, 101, 134, 90, 230, 210, 220, 123],
        color: "#2db7f5",
      },
    ],
  };

  useEffect(() => {
    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chart = echarts.init(lineChartRef.current);

    // 设置图表实例的配置项和数据
    chart.setOption(options);

    // 组件卸载
    return () => {
      //  销毁实例。实例销毁后无法再被使用
      chart.dispose();
    };
  }, [dimensions]);
  function randArray(len: number, min: number, max: number) {
    return Array.from(
      { length: len },
      (v) => Math.floor(Math.random() * (max - min)) + min
    );
  }

  const monthsDiffArray = (startDate: string, endDate: string): string[] => {
    // 将输入的 yyyy - mm 格式转换为 Day.js 可识别的日期格式
    let start = dayjs(startDate);
    let end = dayjs(endDate);
    let months: string[] = [];
    let currentDate = start;

    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      months.push(currentDate.format("YYYY - MM"));
      currentDate = currentDate.add(1, "month");
    }
    return months;
  };
  const handleChange = (metric?: keyof LineChartColorProps) => {
    console.log("selectedTags", selectedTags);
    const chart = echarts.init(lineChartRef.current);
    const start = dayjs(selectedTags.startTime).format("YYYY-MM");
    const end = dayjs(selectedTags.endTime).format("YYYY-MM");
    const diff = dayjs(end).diff(dayjs(start), "month") + 1;
    console.log("diff", diff);
    const xAxis = monthsDiffArray(start, end);
    console.log("xAxis", xAxis);
    if (metric) {
      options.series[0].name = metric;
      options.yAxis[0].name = metric + "(x10^12/L)";
      options.series[0].color = lineChartColor[metric];
      options.legend.data = [metric];
    }
    options.series[0].data = randArray(diff, 10, 200);
    options.xAxis.data = xAxis;
    chart.setOption(options);
  };
  const [selectedTags, setselectedTags] = useState({
    Sex: "initial",
    BMIRange: "initial",
    Ethnicity: "initial",
    startTime: "2024-01",
    endTime: dayjs().format("YYYY-MM"),
  });

  const [initialValue, setinitialValue] = useState({
    Sex: "",
    BMIRange: "",
    Ethnicity: "",
    startTime: "2024-01",
    endTime: dayjs().format("YYYY-MM"),
  });
  /**
   * 处理性别改变事件
   *
   * @param value 性别值
   */
  const handleSexChange = (value: string) => {
    let newSelectedTags = { ...selectedTags, Sex: value };
    setselectedTags(newSelectedTags);
    setinitialValue({ ...initialValue, Sex: value });
    handleChange();
  };
  /**
   * 处理BMI值变化
   *
   * @param value 变化的BMI值，类型为字符串
   */
  const handleBMIChange = (value: string) => {
    let newSelectedTags = { ...selectedTags, BMIRange: value };
    setselectedTags(newSelectedTags);
    setinitialValue({ ...initialValue, BMIRange: value });
    handleChange();
  };
  /**
   * 处理民族变化
   *
   * @param value 民族值
   * @returns 无返回值
   */
  const handleEthnicityChange = (value: string) => {
    let newSelectedTags = { ...selectedTags, Ethnicity: value };
    setselectedTags(newSelectedTags);
    setinitialValue({ ...initialValue, Ethnicity: value });
    handleChange();
  };

  const onStartTimeChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("dateString", dateString);
    let newSelectedTags = { ...selectedTags, startTime: dateString as string };
    setselectedTags(newSelectedTags);
    setinitialValue({ ...initialValue, startTime: dateString as string });
    handleChange();
  };
  const onEndTimeChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("dateString", dateString);
    let newSelectedTags = { ...selectedTags, endTime: dateString as string };
    setselectedTags(newSelectedTags);
    console.log("newSelectedTags", newSelectedTags);
    let newInitialValue = { ...initialValue, endTime: dateString as string };
    setinitialValue(newInitialValue);
    console.log("initialValue", newInitialValue);
    handleChange();
  };
  const initialValues = {
    Sex: "",
    BMIRange: "",
    Ethnicity: "",
    startTime: "2024-01",
    endTime: dayjs().format("YYYY-MM"),
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      return;
    },
    validate: () => {
      return;
    },
  });
  return (
    <>
      <Card className=" m-5">
        <CardHeader className="inline-grid grid-cols-1 p-2">
          <div className="inline-flex items-center">
            <TuneIcon sx={{ mr: 1, color: "purple" }} />
            <CardTitle>Control Panel</CardTitle>
          </div>
          <div
            style={{
              float: "left",
              width: "100%",
              height: 2,
              backgroundColor: "purple",
            }}
          ></div>
        </CardHeader>

        <CardContent>
          <div className=" grid lg:grid-cols-3 gap-12 md:grid-cols-2 gap-6 sm:grid-cols-1">
            <Formik
              className=" grid lg:grid-cols-3 gap-12 md:grid-cols-2 gap-6 sm:grid-cols-1"
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log({ values, actions });
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(false);
              }}
            >
              <Form>
                <label htmlFor="Sex">Sex: </label>
                <Field
                  id="Sex"
                  name="initialValue.Sex"
                  placeholder="Sex"
                  as="select"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </Field>
                {/* <Select
                  onValueChange={(Sex) => {
                    console.log("Sex", Sex);
                    handleSexChange(Sex);
                  }}
                  value={initialValue.Sex}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Sex to display" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                  </SelectContent>
                </Select> */}
              </Form>
              {/* <Select
                onValueChange={(BMI) => {
                  handleBMIChange(BMI);
                }}
                value={initialValue.BMIRange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a MBI range to display" />
                </SelectTrigger>

                <SelectContent>
                  {Object.keys(BMI).map((item, index) => {
                    return (
                      <SelectItem key={item} value={BMI[index].value}>
                        {BMI[index].label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(Ethnicity) => {
                  handleEthnicityChange(Ethnicity);
                }}
                value={initialValue.Ethnicity}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Ethnicity to display" />
                </SelectTrigger>

                <SelectContent>
                  {Object.keys(Ethnicity).map((item, index) => {
                    return (
                      <SelectItem key={item} value={Ethnicity[index].value}>
                        {Ethnicity[index].label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <div className="wrapper ">
                <ConfigProvider
                  theme={{
                    components: {
                      DatePicker: {
                        activeBorderColor: "#e5e5e5",
                      },
                    },
                  }}
                >
                  <DatePicker
                    allowClear={false}
                    className="input w-full h-9 font-normal 
                         text-sm border-1 border-[#e5e5e5]
                         hover:border-[#e5e5e5] font-family: inherit"
                    onChange={onStartTimeChange}
                    picker="month"
                    value={dayjs(initialValue.startTime)}
                    minDate={dayjs("1900-01", "YYYY-MM")}
                    maxDate={dayjs(dayjs().format("YYYY-MM"), "YYYY-MM")}
                  />
                </ConfigProvider>
              </div>

              <div className="wrapper">
                <ConfigProvider
                  theme={{
                    components: {
                      DatePicker: {
                        activeBorderColor: "#e5e5e5",
                      },
                    },
                  }}
                >
                  <DatePicker
                    allowClear={false}
                    className="input w-full h-9 font-normal 
                         text-sm border-1 border-[#e5e5e5]
                         hover:border-[#e5e5e5] font-family: inherit"
                    onChange={onEndTimeChange}
                    picker="month"
                    value={dayjs(initialValue.endTime)}
                    minDate={dayjs(initialValue.startTime, "YYYY-MM")}
                    maxDate={dayjs(dayjs().format("YYYY-MM"), "YYYY-MM")}
                  />
                </ConfigProvider>
              </div> */}
            </Formik>
          </div>
        </CardContent>

        <div className=" tag-wapper grid justify-items-start lg:grid-cols-3 md:grid-cols-2 grid-cols-1 m-2">
          {Object.keys(selectedTags).map((value, index) => {
            if (
              selectedTags[
                value as
                  | "Sex"
                  | "BMIRange"
                  | "Ethnicity"
                  | "startTime"
                  | "endTime"
              ] !== "initial"
            ) {
              return (
                <Tag
                  color="#2db7f5"
                  key={index}
                  className="mt-2 truncate text-xl w-full text-center"
                  closable
                  onClose={() => {
                    let newSelectedTags = {
                      ...selectedTags,
                      [value]: "initial",
                    };
                    setselectedTags(newSelectedTags);
                    let newInitialValue = {
                      ...initialValue,
                      [value]: "",
                    };
                    if (value === "startTime") {
                      newInitialValue.startTime = "2024-01";
                    } else if (value === "endTime") {
                      newInitialValue.endTime = dayjs().format("YYYY-MM");
                    }
                    setinitialValue(newInitialValue);
                  }}
                >
                  {value}
                  {": "}
                  {
                    selectedTags[
                      value as
                        | "Sex"
                        | "BMIRange"
                        | "Ethnicity"
                        | "startTime"
                        | "endTime"
                    ]
                  }
                </Tag>
              );
            } else {
              return <></>;
            }
          })}
        </div>
      </Card>
      <Card className=" m-5">
        <CardHeader className="inline-grid grid-cols-1 p-2">
          <div className="inline-flex items-center">
            <NewspaperIcon sx={{ mr: 1, color: "purple" }} />
            <CardTitle>Trends</CardTitle>
          </div>
          <div
            style={{
              float: "left",
              width: "100%",
              height: 2,
              backgroundColor: "purple",
            }}
          ></div>
        </CardHeader>
        <div className="w-full p-4 grid lg:grid-cols-8 gap-4 md:lg:grid-cols-8 gap-4 sm:grid-cols-1">
          <div className=" mt-2 lg:col-span-2 md:col-span-2 sm:col-span-1">
            <h1 className="">Top 5 Diagnosis Methods</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="flex flex-row">
                    <div className="bg-[#4caf50] w-4 h-4 rounded-xl mr-2"></div>
                    Normal
                  </TableCell>
                  <TableCell>1250</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="flex flex-row">
                    <div className="bg-[#ffc008] w-4 h-4 rounded-xl mr-2"></div>
                    Mild Anemia
                  </TableCell>
                  <TableCell>450</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-row">
                    <div className="bg-[#ff9800] w-4 h-4 rounded-xl mr-2"></div>
                    Moderate Anemia
                  </TableCell>
                  <TableCell>200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-row">
                    <div className="bg-[#f44336] w-4 h-4 rounded-xl mr-2"></div>
                    Severe Anemia
                  </TableCell>
                  <TableCell>80</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="flex flex-row">
                    <div className="bg-[#9c27b0] w-4 h-4 rounded-xl mr-2"></div>
                    Polycythemia
                  </TableCell>
                  <TableCell>70</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="w-full lg:col-span-6 md:col-span-6 sm:col-span-1 ">
            <h1 className="w-full mt-2 mb-2 size-7">Select Metric</h1>
            <RadioGroup
              onValueChange={handleChange}
              defaultValue="WBC"
              className="flex flex-row"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="WBC" id="WBC" />
                <Label htmlFor="WBC">WBC</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="HGB" id="HGB" />
                <Label htmlFor="HGB">HGB</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="RBC" id="RBC" />
                <Label htmlFor="RBC">RBC</Label>
              </div>
            </RadioGroup>
            <div className="w-full min-h-80 mt-4" ref={lineChartRef}></div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ControlAndDisplay;
