import ReactFC from "react-fusioncharts";

const chartConfigs = {
    type: "column2d", // e.g., column2d, line, pie2d
    width: "100%",
    height: "400",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Monthly Revenue",
        xAxisName: "Month",
        yAxisName: "Revenue",
        theme: "fusion"
      },
      data: [
        { label: "Jan", value: "420000" },
        { label: "Feb", value: "810000" },
        { label: "Mar", value: "720000" }
      ]
    }
  };
  
  export default function RevenueChart() {
    return <ReactFC {...chartConfigs} />;
  }
  