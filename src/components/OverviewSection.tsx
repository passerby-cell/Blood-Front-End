import React from "react";
import { Paper, Typography, Box, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import OverviewIcon from "@mui/icons-material/Dashboard";
import AgeSexDistributionChart from "./AgeSexDistributionChart";
import MyAgeSexDistributionChart from "./MyAgeSexDistributionChart";
import ChartTabs from "./ChartTabs";
import MyChartTabs from "./MyChartTabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface OverviewSectionProps {
  title: string;
  sx?: SxProps<Theme>;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ title, sx }) => {
  return (
    <>
      <Card className=" m-5">
        <CardHeader className="inline-grid grid-cols-1 p-2">
          <div className="inline-flex items-center">
            <OverviewIcon sx={{ mr: 1, color: "purple" }} />
            <CardTitle> {title}</CardTitle>
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

        <div className="w-full columns-4xl">
          <div className=" p-5 flex items-center justify-center">
            <MyAgeSexDistributionChart />
          </div>
          <div className="  p-5 ">
            <MyChartTabs />
          </div>
        </div>
      </Card>
    </>
  );
};

export default OverviewSection;
