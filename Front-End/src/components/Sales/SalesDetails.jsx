/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { getAuthUser } from "../../helper/Storage";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./SalesDetails.css"

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SalesDetails = () => {
  const { id } = useParams();
  const { accessToken } = getAuthUser();
  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [loading, setLoading] = useState(true); // State variable for loading indicator

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await fetch(
          `http://127.0.0.1:8000/api/sales/shop_id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const salesData = await salesResponse.json();
        console.log("Sales Data:", salesData);

        const lineData = {};
        const pieData = {};

        for (const sale of salesData) {
          // Extracting date information
          const saleDate = new Date(sale.created_at);
          const year = saleDate.getFullYear();
          const month = saleDate.getMonth() + 1; // Month starts from 0
          const day = saleDate.getDate();

          const productResponse = await fetch(
            `http://127.0.0.1:8000/api/product/${sale.product_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const productDataArray = await productResponse.json();

          if (productDataArray.length > 0) {
            const productData = productDataArray[0];
            console.log("Product Data:", productData);

            const price = parseFloat(productData.price);
            const discountPrice = parseFloat(productData.discount_price);

            if (lineData[`${year}-${month}-${day}`]) {
              lineData[`${year}-${month}-${day}`].quantity += sale.quantity;
              lineData[`${year}-${month}-${day}`].profit +=
                !isNaN(price) && !isNaN(discountPrice)
                  ? (price - discountPrice) * sale.quantity
                  : 0;
            } else {
              lineData[`${year}-${month}-${day}`] = {
                quantity: sale.quantity,
                profit:
                  !isNaN(price) && !isNaN(discountPrice)
                    ? (price - discountPrice) * sale.quantity
                    : 0,
              };
            }

            if (pieData[productData.name]) {
              pieData[productData.name].quantity += sale.quantity;
              pieData[productData.name].profit +=
                !isNaN(price) && !isNaN(discountPrice)
                  ? (price - discountPrice) * sale.quantity
                  : 0;
            } else {
              pieData[productData.name] = {
                quantity: sale.quantity,
                profit:
                  !isNaN(price) && !isNaN(discountPrice)
                    ? (price - discountPrice) * sale.quantity
                    : 0,
              };
            }
          } else {
            console.error(
              "No product data found for product ID:",
              sale.product_id
            );
          }
        }

        setLineChartData(
          Object.entries(lineData).map(([date, { quantity, profit }]) => ({
            x: new Date(date),
            y: profit,
            quantity: quantity,
          }))
        );
        setPieChartData(
          Object.entries(pieData).map(([name, { quantity, profit }]) => ({
            label: name,
            y: profit,
            quantity: quantity,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accessToken, id]);

  const optionsPieChart = {
    theme: "dark2",
    exportEnabled: true,
    animationEnabled: true,
    animationDuration: 2000, // Adjust the duration as needed (in milliseconds)
    backgroundColor: "transparent",
    colorSet: "Mix1",
    title: {
    text: "Product Profits",
    fontColor: "#ffde77",
    fontFamily: "Arial",
    fontWeight: "Bold"
  },
  legend : {
    fontColor: "",
 },
  toolTip: {
    contentFormatter: function (e) {
      let content =
        "<strong>" + e.entries[0].dataPoint.label + "</strong><br/>";
      for (let i = 0; i < e.entries.length; i++) {
        content += "Quantity: " + e.entries[i].dataPoint.quantity + "<br/>";
      }
      content += "Profit: $" + e.entries[0].dataPoint.y;
      return content;
    },
    fontColor: "#ffde77",

  },
  toolbar: {
    itemBackgroundColor: "#FFF",
    fontColor: "#000",
},
  data: [
    {
      type: "doughnut",
      startAngle: 75,
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 18,
      indexLabelFontWeight: "Bold",
      indexLabelFontFamily: "Arial",
      indexLabelFontColor: "#ffde77",
      indexLabel: "{label} - ${y}",
      dataPoints: pieChartData.filter(
        (data) => !data.label.startsWith("Shop:")
      ),
    },
  ],
};

 const optionsLineChart = {
    theme: "dark2",
    animationEnabled: true,
    exportEnabled: true,
    animationDuration: 2000, // Adjust the duration as needed (in milliseconds)
    backgroundColor: "transparent",
    title: {
      text: "Quantity/Profit",
      fontColor: "#b0349d",
      fontFamily: "Arial",
      fontWeight: "Bold"
    },
    axisX: {
      title: "Date",
      titleFontFamily: "tahoma",
      titleFontWeight: "bold",
      valueFormatString: "DD/MM/YYYY",
      lineColor: "#b0349d",
      tickLength: 5,
      tickColor: "#FFF",
      // tickThickness: 5,
      labelFontColor: "#FFF",
      labelFontFamily: "tahoma",
      labelFontSize: 12,
      labelFontWeight: "bold",
      titleFontColor: "#b0349d",
      lineThickness: 3,
      lineColor: "#b0349d",
      // lineDashType: "dot",
      margin: -10
    },
    axisY: [
      {
        title: "Profit ($)",
        titleFontFamily: "tahoma",
        titleFontWeight: "bold",
        lineColor: "#ffde77",
        tickLength: 5,
        tickColor: "#FFF",
        // tickThickness: 5,
        labelFontColor: "#FFF",
        labelFontFamily: "tahoma",
        labelFontSize: 12,
        labelFontWeight: "bold",
        titleFontColor: "#b0349d",
        gridThickness: 0,
        lineThickness: 3,
        lineColor: "#b0349d",
        margin: 20
      },
      {
        title: "Quantity",
        titleFontFamily: "tahoma",
        titleFontWeight: "bold",
        lineColor: "#ffde77",
        tickLength: 5,
        tickColor: "#FFF",
        // tickThickness: 5,
        labelFontColor: "#FFF",
        labelFontFamily: "tahoma",
        labelFontSize: 12,
        labelFontWeight: "bold",
        titleFontColor: "#b0349d",
        gridThickness: 0,
        lineThickness: 3,
        lineColor: "#b0349d",
        margin: 20,
        opposite: true,
      },
    ],
    toolTip: {
      shared: true,
      contentFormatter: function (e) {
        let content =
          "<strong>" +
          e.entries[0].dataPoint.x.toDateString() +
          "</strong><br/>";

        for (let i = 0; i < e.entries.length; i++) {
          const dataPoint = e.entries[i].dataPoint;

          if (dataPoint.seriesName === "Profit") {
            content += "Profit: $" + dataPoint.y + "<br/>";
          }

          if (dataPoint.seriesName === "Quantity") {
            content += "Quantity: " + dataPoint.y + "<br/>";
          }
        }

        return content;
      },
      fontColor: "#ffde77",
    },
    legend : {
      fontColor: "",
   },
    toolbar: {
      itemBackgroundColor: "#FFF",
      fontColor: "#000",
  },
    data: [
      {
        type: "column",
        name: "Profit",
        showInLegend: true,
        axisYIndex: 0,
        lineThickness: 2,
        lineStepType: "line",
        color: "#ffde77", // Magenta fill color under the graph line for Profit
        dataPoints: lineChartData.map((data) => ({
          x: data.x,
          y: data.y,
          quantity: data.quantity,
          seriesName: "Profit",
        })),
      },
      {
        type: "column",
        name: "Quantity",
        showInLegend: true,
        axisYIndex: 1,
        lineThickness: 2,
        lineStepType: "line",
        color: "#b0349d", // Cyan fill color under the graph line for Quantity
        dataPoints: lineChartData.map((data) => ({
          x: data.x,
          y: data.quantity,
          seriesName: "Quantity",
        })),
      },
    ],
  };

  const optionsAppChart = {
    theme: "dark2",
    animationEnabled: true,
    exportEnabled: true,
    animationDuration: 2000, // Adjust the duration as needed (in milliseconds)
    backgroundColor: "transparent",
    title: {
      text: "Quantity of Products Sold",
      fontColor: "#2cffb2",
      fontFamily: "Arial",
      fontWeight: "Bold"
    },
    axisX: {
      title: "Date",
      titleFontFamily: "tahoma",
      titleFontWeight: "bold",
      valueFormatString: "DD/MM/YYYY",
      lineColor: "#2cffb2",
      tickLength: 5,
      tickColor: "#FFF",
      labelFontColor: "#FFF",
      labelFontFamily: "tahoma",
      labelFontSize: 12,
      labelFontWeight: "bold",
      titleFontColor: "#2cffb2",
      lineThickness: 3,
      margin: 10
    },
    axisY: {
      title: "Quantity",
      titleFontFamily: "tahoma",
      titleFontWeight: "bold",
      tickLength: 5,
      tickColor: "#FFF",
      labelFontColor: "#FFF",
      labelFontFamily: "tahoma",
      labelFontSize: 12,
      labelFontWeight: "bold",
      titleFontColor: "#2cffb2",
      gridThickness: 0,
      margin: 20,
      lineThickness: 3,
      lineColor: "#2cffb2"
    },
    toolTip: {
      contentFormatter: function (e) {
        let content =
          "<strong>" +
          e.entries[0].dataPoint.x.toDateString() +
          "</strong><br/>";
  
        for (let i = 0; i < e.entries.length; i++) {
          const dataPoint = e.entries[i].dataPoint;
          content += "Quantity: " + dataPoint.y + "<br/>";
        }
  
        return content;
      },
      fontColor: "#0494dc",
    },
    toolbar: {
      itemBackgroundColor: "#FFF",
      fontColor: "#000",
    },
    data: [
      {
        type: "splineArea",
        color: "#2cffb2",
        dataPoints: lineChartData.map((data) => ({
          x: data.x,
          y: data.quantity,
        })),
      },
    ],
  };
  

  const optionsFourthChart = {
    theme: "dark2",
    animationEnabled: true,
    exportEnabled: true,
    animationDuration: 2000, // Adjust the duration as needed (in milliseconds)
    backgroundColor: "transparent",
    title: {
      text: "Profits",
      fontColor: "#0494dc",
      fontFamily: "Arial",
      fontWeight: "Bold"
    },
    axisX: {
      title: "Date",
      titleFontFamily: "tahoma",
      titleFontWeight: "bold",
      valueFormatString: "DD/MM/YYYY",
      lineColor: "#0494dc",
      tickLength: 5,
      tickColor: "#FFF",
      // tickThickness: 5,
      labelFontColor: "#FFF",
      labelFontFamily: "tahoma",
      labelFontSize: 12,
      labelFontWeight: "bold",
      titleFontColor: "#0494dc",
      lineThickness: 3,
      lineColor: "#0494dc",
      margin: 10

    },
    axisY: {
      title: "Profit ($)",
      titleFontFamily: "tahoma",
      titleFontWeight: "bold",
      tickLength: 5,
      tickColor: "#FFF",
      // tickThickness: 5,
      labelFontColor: "#FFF",
      labelFontFamily: "tahoma",
      labelFontSize: 12,
      labelFontWeight: "bold",
      titleFontColor: "#0494dc",
      gridThickness: 0,
      margin: 20,
      lineThickness: 3,
      lineColor: "#0494dc"
    },
    toolTip: {
      contentFormatter: function (e) {
        let content =
          "<strong>" +
          e.entries[0].dataPoint.x.toDateString() +
          "</strong><br/>";

        for (let i = 0; i < e.entries.length; i++) {
          const dataPoint = e.entries[i].dataPoint;
          content += "Profit: $" + dataPoint.y + "<br/>";
        }

        return content;
      },
      fontColor: "#0494dc",
    },
    toolbar: {
      itemBackgroundColor: "#FFF",
      fontColor: "#000",
  },
    data: [
      {
        type: "splineArea",
        color: "#0494dc", // fill color under the graph line for Profits
        dataPoints: lineChartData.map((data) => ({
          x: data.x,
          y: data.y,
        })),
      },
    ],
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Set height to fill the screen vertically
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="shop-dashboard">
      <div className="row">
        <div className="chart">
          <CanvasJSChart options={optionsPieChart} />
        </div>
        <div className="chart">
          <CanvasJSChart options={optionsLineChart} />
        </div>
      </div>
      <div className="row">
        <div className="chart">
          <CanvasJSChart options={optionsAppChart} />
        </div>
        <div className="chart">
          <CanvasJSChart options={optionsFourthChart} />
        </div>
      </div>
    </div>
  );
};

export default SalesDetails;