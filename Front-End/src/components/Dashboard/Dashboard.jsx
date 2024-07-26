/* eslint-disable no-template-curly-in-string */ // Disable eslint rule for template curly braces
import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { getAuthUser } from "../../helper/Storage";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import { MDBBtn } from "mdb-react-ui-kit";
import "./Dashboard.css";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const CanvasJS = CanvasJSReact.CanvasJS;

const Dashboard = () => {
  const { id } = useParams();
  const { accessToken } = getAuthUser();
  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [warehouseData, setWarehouseData] = useState([]);
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // State variable for loading indicator
  CanvasJS.addColorSet("Mix1", [
    // "#ffde77",
    // "#eca76a",
    // "#e4dc9c",
    // "#fad46c",
    // "#d4c471",
    // "#f36530",
    "#5e96cf",
    "#54b8d0",
    "#ffec68",
    "#ed726a",
    "#f2b211",
    "#d7d6a1",

  ]);  
  CanvasJS.addColorSet("Mix2", [
    "#b0349d",
    "#754eb1",
    "#704285",
    "#dfa1a6",
    "#9d66a8",
    "#c05a7c",
  ]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await fetch(
          `http://127.0.0.1:8000/api/sales`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const salesData = await salesResponse.json();

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

            const warehouseResponse = await fetch(
              `http://127.0.0.1:8000/api/shopInfo`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            const data = await warehouseResponse.json();
            setWarehouseData(data);

            // Fetch shop info
            const shopResponse = await fetch(
              `http://127.0.0.1:8000/api/shopInfo/${sale.shop_id}`,
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
            const shopData = await shopResponse.json();
            const shopName = "Shop: " + shopData.shop_name;

            // Add profit to shop name
            if (pieData[shopName]) {
              // If the shop already exists in pieData, update its quantity and profit
              pieData[shopName].quantity += sale.quantity;
              pieData[shopName].profit +=
                !isNaN(price) && !isNaN(discountPrice)
                  ? (price - discountPrice) * sale.quantity
                  : 0;
            } else {
              // If the shop doesn't exist in pieData, initialize its quantity and profit
              pieData[shopName] = {
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

        const usersResponse = await fetch(
          `http://127.0.0.1:8000/api/allUsers`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users data");
        }
        const userData = await usersResponse.json();
        const roleZeroUsers = userData.filter((user) => user.role === 0);
        setUsersData(roleZeroUsers);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading state is set to false even if an error occurs
      }
    };

    fetchData();
  }, [accessToken, id]);

  const TotalProfit = () => {
    const totalProfit = lineChartData.reduce((acc, data) => acc + data.y, 0);

    return (
      <div className="widget futuristic-widget">
        <div className="widget-icon">
          <MonetizationOnRoundedIcon />
        </div>
        <div className="widget-content">
          <h3>Total Profit</h3>
          <div className="total-amount">
            <AttachMoneyIcon />
            {totalProfit.toFixed(2)}
          </div>
        </div>
      </div>
    );
  };
  const TotalQuantity = () => {
    const totalQuantity = lineChartData.reduce(
      (acc, data) => acc + data.quantity,
      0
    );

    return (
      <div className="widget futuristic-widget">
        <div className="widget-icon">
          <ShoppingCartIcon />
        </div>
        <div className="widget-content">
          <h3>Total number of sales</h3>
          <div className="total-amount">
            <AddShoppingCartIcon />
            {totalQuantity}
          </div>
        </div>
      </div>
    );
  };
  const TotalUsers = () => {
    const totalUsers = usersData.length; // Count the number of users

    return (
      <div className="widget futuristic-widget">
        <div className="widget-icon">
          <GroupIcon />
        </div>
        <div className="widget-content">
          <h3>Total Users</h3>
          <div className="total-amount">
            <PersonIcon />
            {totalUsers}
          </div>
        </div>
      </div>
    );
  };
  const TotalWarehouses = () => {
    const handleAddWarehouse = () => {
      // Navigate to the add-warehouse page
      navigate("/add-warehouse");
    };
    const totalWarehouses = warehouseData.length; // Count the number of warehouses

    return (
      <div className="widget futuristic-widget">
        <div className="widget-icon">
          <WarehouseIcon />
        </div>
        <div className="widget-content">
          <h3>Total Warehouses</h3>
          <div className="total-amount">
            <AddBusinessIcon />
            {totalWarehouses}
          </div>
        </div>
        <div className="widget-button">
          {/* <MDBBtn color="info" onClick={handleAddWarehouse}>
            <AddHomeWorkIcon />
          </MDBBtn> */}
        </div>
      </div>
    );
  };

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
        type: "pie",
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

  const optionsShopPieChart = {
    theme: "dark2",
    exportEnabled: true,
    animationEnabled: true,
    animationDuration: 2000, // Adjust the duration as needed (in milliseconds)
    backgroundColor: "transparent",
    colorSet: "Mix2",
    title: {
      text: "Shop Profits",
      fontColor: "#dfa1a6",
      fontFamily: "Arial",
      fontWeight: "Bold"
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
      fontColor: "#dfa1a6",
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
        type: "doughnut",
        startAngle: 75,
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 18,
        indexLabelFontWeight: "Bold",
        indexLabelFontFamily: "Arial",
        indexLabelFontColor: "#dfa1a6",
        indexLabel: "{label} - ${y}",
        dataPoints: pieChartData.filter((data) =>
          data.label.startsWith("Shop:")
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

  const optionsUsersGraph = {
    theme: "dark2",
    exportEnabled: true,
    animationEnabled: true,
    animationDuration: 2000, // Adjust the duration as needed (in milliseconds)
    backgroundColor: "transparent",
    title: {
      text: "Registered Users",
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
      // tickThickness: 5,
      labelFontColor: "#FFF",
      labelFontFamily: "tahoma",
      labelFontSize: 12,
      labelFontWeight: "bold",
      titleFontColor: "#2cffb2",
      // lineDashType: "dot",
      lineThickness: 3,
      lineColor: "#2cffb2",
    },
    axisY: {
      title: "Count",
      titleFontFamily: "tahoma",
      titleFontWeight: "bold",
      tickLength: 5,
      tickColor: "#FFF",
      // tickThickness: 5,
      labelFontColor: "#FFF",
      labelFontFamily: "tahoma",
      labelFontSize: 12,
      labelFontWeight: "bold",
      titleFontColor: "#2cffb2",
      // lineDashType: "dot",
      gridThickness: 0,
      lineThickness: 3,
      lineColor: "#2cffb2",
    },
    toolbar: {
      itemBackgroundColor: "#FFF",
      fontColor: "#000",
  },
    data: [
      {
        type: "stepArea",
        color: "#2cffb2", // fill color under the graph line for Registered Users
        // indexLabel: "{y}",
        indexLabelFontColor: "white", // Dark color for index label text
        animationEnabled: true,
        dataPoints: (() => {
          const aggregatedCounts = {};

          usersData.forEach((user) => {
            const creationDate = new Date(user.created_at).toLocaleDateString();

            if (aggregatedCounts[creationDate]) {
              aggregatedCounts[creationDate]++;
            } else {
              aggregatedCounts[creationDate] = 1;
            }
          });

          return Object.entries(aggregatedCounts).map(([date, count]) => ({
            x: new Date(date),
            y: count,
          }));
        })(),
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
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="row">
        <div className="chartw1">
          <TotalProfit />
        </div>
        <div className="chartw2">
          <TotalQuantity />
        </div>
        <div className="chartw3">
          <TotalUsers />
        </div>
        <div className="chartw4">
          <TotalWarehouses />
        </div>
      </div>
      <div className="row">
      <div className="chart">
          <CanvasJSChart options={optionsLineChart} />
        </div>
      </div>
      <div className="row">
        <div className="chart">
          <CanvasJSChart options={optionsPieChart} />
        </div>
        <div className="chart">
          <CanvasJSChart options={optionsShopPieChart} />
        </div>
      </div>
      <div className="row">
      <div className="chart">
          <CanvasJSChart options={optionsFourthChart} />
     </div>
        <div className="chart">
          <CanvasJSChart options={optionsUsersGraph} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
