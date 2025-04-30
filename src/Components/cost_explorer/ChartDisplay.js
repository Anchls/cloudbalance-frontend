import React, { useState } from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";
import { BarChart, LineChart } from "lucide-react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

// Resolve chart dependencies
ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

// Helper function to extract month-year from period
const parsePeriod = (period) => {
  if (!period) return "";
  const [startDate] = period.split(" to ");
  const [day, month, year] = startDate.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

const ChartDisplay = ({ data, loading, groupBy }) => {
  const [chartType, setChartType] = useState("column");

  const months = [...new Set(data.map((item) => parsePeriod(item.period)))].sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const serviceTotals = data.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + item.total;
    return acc;
  }, {});

  const sortedServices = Object.entries(serviceTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name]) => name);

  const categories = [
    {
      category: months.map((month) => ({
        label: month,
      })),
    },
  ];

  const dataset = [...sortedServices, "Others"].map((serviceName, index) => {
    const seriesData = months.map((month) => {
      if (serviceName === "Others") {
        const totalOthers = data
          .filter(
            (d) =>
              !sortedServices.includes(d.name) &&
              parsePeriod(d.period) === month
          )
          .reduce((sum, item) => sum + item.total, 0);
        return { value: totalOthers };
      } else {
        const item = data.find(
          (d) => d.name === serviceName && parsePeriod(d.period) === month
        );
        return { value: item ? item.total : 0 };
      }
    });

    const paletteColors = ["#0088FE", "#55C5B5", "#FFD166", "#FF9064", "#7A77FF", "#FF6B6B"];

    return chartType === "line"
      ? {
          seriesname: serviceName,
          data: seriesData,
          color: paletteColors[index % paletteColors.length],
          anchorBgColor: paletteColors[index % paletteColors.length],
          anchorBorderColor: paletteColors[index % paletteColors.length],
          anchorRadius: "5",
          anchorBorderThickness: "1",
          anchorAlpha: "100",
          anchorBgAlpha: "100",
          drawAnchors: "1",
        }
      : {
          seriesname: serviceName,
          data: seriesData,
          color: paletteColors[index % paletteColors.length],
        };
  });

  const chartDataSource = {
    chart: {
      caption: `${groupBy} Cost Analysis (Month-wise)`,
      subCaption: months.length > 0 ? `${months[0]} to ${months[months.length - 1]}` : "",
      xAxisName: groupBy,
      yAxisName: "Cost ($)",
      theme: "fusion",
      showValues: "0",
      defaultNumberScale: "K",
      numberScaleUnit: "K,M,B",
      numberScaleValue: "1000,1000,1000",
      paletteColors: "#0088FE,#55C5B5,#FFD166,#FF9064,#7A77FF,#FF6B6B",
      showPlotBorder: chartType === "column" ? "0" : undefined,
      plotSpacePercent: chartType === "column" && months.length > 6 ? "60" : "40",
      showLegend: "1",
      legendPosition: "bottom",
      drawCrossLine: "1",
      toolTipBgColor: "#ffffff",
      toolTipBgAlpha: "80",
      showCanvasBorder: "1",
      chartLeftMargin: "40",
      chartRightMargin: "40",
      chartBottomMargin: "80",
      chartTopMargin: "40",
      labelDisplay: "auto",
      rotateValues: "0",
      placeValuesInside: "0",
      showToolTip: "1",
      // Line-specific settings
      lineThickness: chartType === "line" ? "3" : undefined,
      drawAnchors: chartType === "line" ? "1" : undefined,
    },
    categories,
    dataset,
  };

  const chartConfig = {
    type: chartType === "column" ? "mscolumn2d" : "msline",
    width: "100%",
    height: "600",
    dataFormat: "json",
    dataSource: chartDataSource,
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        padding: 3,
        borderRadius: 2,
        boxShadow: 1,
        minHeight: "600px",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Button
          variant={chartType === "column" ? "contained" : "outlined"}
          startIcon={<BarChart size={20} />}
          onClick={() => setChartType("column")}
        >
          Bar Chart
        </Button>
        <Button
          variant={chartType === "line" ? "contained" : "outlined"}
          startIcon={<LineChart size={20} />}
          onClick={() => setChartType("line")}
        >
          Line Chart
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
          <Typography variant="body2" color="textSecondary" mt={2}>
            Loading chart data...
          </Typography>
        </Box>
      ) : data.length > 0 ? (
        <ReactFC {...chartConfig} />
      ) : (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary" fontStyle="italic">
            No data available for the selected criteria
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChartDisplay;
