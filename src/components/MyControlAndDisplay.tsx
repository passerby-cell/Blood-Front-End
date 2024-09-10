import React, { useState } from "react";
import "@/components/css/MyControlAndDisplay.sass";
import TuneIcon from "@mui/icons-material/Tune";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { CardContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { ConfigProvider, DatePicker } from "antd";
import { Tag } from "antd";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
    startTime: "initial",
    endTime: "initial",
  });
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState("WBC");
  const [Sex] = useState("");
  const [filteredData, setFilteredData] = useState(initialDummyData);

  const handleFilterApply = () => {
    const newFilter = `Sex: ${Sex}`;
    if (!selectedFilters.includes(newFilter) && Sex) {
      setSelectedFilters((prev) => [...prev, newFilter]);
    }

    // Apply filtering based on the selected Sex
    const newFilteredData = initialDummyData.filter(
      (item) => !Sex || item.Sex === Sex
    );
    setFilteredData(newFilteredData);
  };

  const handleChipDelete = (chipToDelete: string) => {
    setSelectedFilters((chips) =>
      chips.filter((chip) => chip !== chipToDelete)
    );
    // Reset to initial data when a filter is removed
    setFilteredData(initialDummyData);
  };

  const handleMetricChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMetric(event.target.value);
  };

  // const handleSexChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //     setSex(event.target.value as string);
  // };
  const formSchema = z.object({
    Sex: z.string(),
    BMIRange: z.string(),
    Ethnicity: z.string().optional(),
    startTime: z.string(),
    endTime: z.string(),
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Sex: "",
      BMIRange: "",
      Ethnicity: "",
      startTime: "2020-01",
      endTime: dayjs().format("YYYY-MM"),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  /**
   * 处理性别改变事件
   *
   * @param value 性别值
   */
  const handleSexChange = (value: string) => {
    let newSelectedTags = { ...selectedTags, Sex: value };
    setselectedTags(newSelectedTags);
  };
  /**
   * 处理BMI值变化
   *
   * @param value 变化的BMI值，类型为字符串
   */
  const handleBMIChange = (value: string) => {
    let newSelectedTags = { ...selectedTags, BMIRange: value };
    setselectedTags(newSelectedTags);
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
  };

  const onStartTimeChange: DatePickerProps["onChange"] = (date, dateString) => {
    let newSelectedTags = { ...selectedTags, startTime: dateString as string };
    setselectedTags(newSelectedTags);
    form.setValue("startTime", dateString as string);
  };
  const onEndTimeChange: DatePickerProps["onChange"] = (date, dateString) => {
    let newSelectedTags = { ...selectedTags, endTime: dateString as string };
    setselectedTags(newSelectedTags);
    form.setValue("endTime", dateString as string);
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

        <Form {...form}>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" grid lg:grid-cols-3 gap-12 md:grid-cols-2 gap-6 sm:grid-cols-1"
            >
              <FormField
                control={form.control}
                name="Sex"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormLabel className=" mt-2  w-32  ">Sex</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        onValueChange={(Sex) => {
                          field.onChange(Sex);
                          handleSexChange(Sex);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Sex to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="BMIRange"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormLabel className=" mt-2 w-32 ">BMI Range</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        onValueChange={(BMI) => {
                          field.onChange(BMI);
                          handleBMIChange(BMI);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a MBI range to display" />
                          </SelectTrigger>
                        </FormControl>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Ethnicity"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormLabel className=" mt-2  w-32  ">Ethnicity</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        onValueChange={(Ethnicity) => {
                          field.onChange(Ethnicity);
                          handleEthnicityChange(Ethnicity);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Ethnicity to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(Ethnicity).map((item, index) => {
                            return (
                              <SelectItem
                                key={item}
                                value={Ethnicity[index].value}
                              >
                                {Ethnicity[index].label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormLabel className=" mt-2  w-32  ">Start Time</FormLabel>
                    <FormControl className="w-full">
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
                            className="input w-full h-9 font-normal 
                         text-sm border-1 border-[#e5e5e5]
                         hover:border-[#e5e5e5] font-family: inherit"
                            onChange={onStartTimeChange}
                            picker="month"
                            defaultValue={dayjs(field.value)}
                            minDate={dayjs("1900-01", "YYYY-MM")}
                            maxDate={dayjs(
                              dayjs().format("YYYY-MM"),
                              "YYYY-MM"
                            )}
                          />
                        </ConfigProvider>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-2">
                    <FormLabel className=" mt-2  w-32  ">End Time</FormLabel>
                    <FormControl className="w-full">
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
                            className="input w-full h-9 font-normal 
                         text-sm border-1 border-[#e5e5e5]
                         hover:border-[#e5e5e5] font-family: inherit"
                            onChange={onEndTimeChange}
                            picker="month"
                            defaultValue={dayjs(field.value)}
                            minDate={dayjs(
                              form.getValues("startTime"),
                              "YYYY-MM"
                            )}
                            maxDate={dayjs(
                              dayjs().format("YYYY-MM"),
                              "YYYY-MM"
                            )}
                          />
                        </ConfigProvider>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </CardContent>
        </Form>
        <div className=" tag-wapper grid gap-2 justify-items-start lg:grid-cols-3 md:grid-rows-2 grid-rows-5 m-4">
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
                    form.setValue(
                      value as
                        | "Sex"
                        | "BMIRange"
                        | "Ethnicity"
                        | "startTime"
                        | "endTime",
                      undefined
                    );
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
    </>
  );
};

export default ControlAndDisplay;
