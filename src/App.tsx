import { Box, CardContent, Chip, Grid, Typography } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import OverviewSection from "./components/OverviewSection";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import MyHematologyHistograms from "./components/MyHematologyHistograms";
import ControlAndDisplay from "./components/ControlAndDisplay";
import { Card, CardHeader, CardTitle } from "./components/ui/card";
import MyControlAndDisplay from "./components/MyControlAndDisplay";
import MyControlAndDisplayWithoutForm from "./components/MyControlAndDisplayWithoutForm";
import MyControlAndDisplayWithFormik from "./components/MyControlAndDisplayWithFormik";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <OverviewSection title="Patients Overview" />
      </Box>
      <div className="lg:flex lg:columns-4xl columns-1">
        <div className="lg:w-1/3 ">
          <Card className="m-5 lg:h-48 sm:h-auto">
            <CardHeader className="inline-grid grid-cols-1 p-2">
              <div className="inline-flex items-center">
                <WhatshotIcon sx={{ mr: 1, color: "purple" }} />
                <CardTitle> Today's Trending</CardTitle>
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
              <Chip
                label="Flu risk is under control"
                sx={{
                  m: 1,
                  backgroundColor: "green",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
              <Chip
                label="Alert is running"
                sx={{
                  m: 1,
                  backgroundColor: "orange",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
              <Chip
                label="Busy time during holiday seasons"
                sx={{
                  m: 1,
                  backgroundColor: "purple",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:w-2/3 ">
          <Card className="m-5 lg:h-48 sm:h-auto">
            <CardHeader className="inline-grid grid-cols-1 p-2">
              <div className="inline-flex items-center">
                <AddAlertIcon sx={{ mr: 1, color: "purple" }} />
                <CardTitle>Alerting</CardTitle>
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

            <div className="flex">
              <p className="w-1/3 p-2">
                Unusually high WBC, RET-He compared to same time of the previous
                year
              </p>
              <div className="w-2/3 p-2">
                <MyHematologyHistograms />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <ControlAndDisplay />
      {/* <MyControlAndDisplay /> */}
      <MyControlAndDisplayWithoutForm />
      <MyControlAndDisplayWithFormik />
    </>
  );
}

export default App;
