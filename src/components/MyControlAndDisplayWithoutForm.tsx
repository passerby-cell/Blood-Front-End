import React, { useState } from "react";
import "@/components/css/MyControlAndDisplay.sass";
import TuneIcon from "@mui/icons-material/Tune";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { CardContent } from "@mui/material";
import { ConfigProvider, DatePicker } from "antd";
import { Tag } from "antd";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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

dayjs.extend(customParseFormat);
const initialDummyData = [
  {
    time: "Jan",
    WBC: 6000,
    HGB: 14,
    RBC: 4.5,
    diagnosis: "Diagnosis Method 1",
    Sex: "Male",
  },
  {
    time: "Feb",
    WBC: 6200,
    HGB: 13.9,
    RBC: 4.6,
    diagnosis: "Diagnosis Method 2",
    Sex: "Female",
  },
  {
    time: "Mar",
    WBC: 6100,
    HGB: 14.1,
    RBC: 4.7,
    diagnosis: "Diagnosis Method 3",
    Sex: "Male",
  },
  {
    time: "Apr",
    WBC: 6300,
    HGB: 14.2,
    RBC: 4.8,
    diagnosis: "Diagnosis Method 1",
    Sex: "Female",
  },
  {
    time: "May",
    WBC: 6400,
    HGB: 14.3,
    RBC: 4.9,
    diagnosis: "Diagnosis Method 4",
    Sex: "Male",
  },
  {
    time: "Jun",
    WBC: 6500,
    HGB: 14.5,
    RBC: 5.0,
    diagnosis: "Diagnosis Method 2",
    Sex: "Female",
  },
];

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

const ControlAndDisplay: React.FC = () => {
  const [selectedTags, setselectedTags] = useState({
    Sex: "initial",
    BMIRange: "initial",
    Ethnicity: "initial",
    startTime: "2020-01",
    endTime: dayjs().format("YYYY-MM"),
  });

  const [initialValue, setinitialValue] = useState({
    Sex: "",
    BMIRange: "",
    Ethnicity: "",
    startTime: "2020-01",
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
  };

  const onStartTimeChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("dateString", dateString);
    let newSelectedTags = { ...selectedTags, startTime: dateString as string };
    setselectedTags(newSelectedTags);
    setinitialValue({ ...initialValue, startTime: dateString as string });
  };
  const onEndTimeChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log("dateString", dateString);
    let newSelectedTags = { ...selectedTags, endTime: dateString as string };
    setselectedTags(newSelectedTags);
    console.log("newSelectedTags", newSelectedTags);
    let newInitialValue = { ...initialValue, endTime: dateString as string };
    setinitialValue(newInitialValue);
    console.log("initialValue", newInitialValue);
  };
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
            <Select
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
            </Select>

            <Select
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
            </div>
          </div>
        </CardContent>

        <div className=" tag-wapper grid gap-2 justify-items-start lg:grid-cols-3 md:grid-rows-2 grid-rows-5 m-2">
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
                  className="truncate text-xl w-full text-center"
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
                      newInitialValue.startTime = "2020-01";
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
          <div className="lg:col-span-2 md:col-span-2 sm:col-span-1">
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
          <div className="w-full h-28 lg:col-span-6 md:col-span-6 sm:col-span-1 bg-black"></div>
        </div>
      </Card>
    </>
  );
};

export default ControlAndDisplay;
