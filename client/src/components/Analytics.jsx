import React from "react";
import { useGlobalContextUser } from "../context/UserContext";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { BarChart } from "@mui/x-charts/BarChart";

import moment from "moment";

const Analytics = () => {
  const categories = ["salary", "project", "food", "movie"];

  const { allTransactions } = useGlobalContextUser();
  const totalTransaction = allTransactions.length;
  const totalIncomeTransactions = allTransactions.filter(
    (f) => f.type === "income"
  );
  const totalExpenseTransactions = allTransactions.filter(
    (f) => f.type === "expense"
  );
  const totalIncomePercentage =
    (totalIncomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercentage =
    (totalExpenseTransactions.length / totalTransaction) * 100;

  // amount total turnover

  const totalTurnOver = allTransactions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalIncomeTurnOver = allTransactions
    .filter((f) => f.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenseTurnOver = allTransactions
    .filter((f) => f.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalIncomeTurnOverPercentage =
    (totalIncomeTurnOver / totalTurnOver) * 100;
  const totalExpenseTurnOverPercentage =
    (totalExpenseTurnOver / totalTurnOver) * 100;

  const data = categories.map((category) => {
    const amount = allTransactions
      .filter((f) => f.category === category)
      .reduce((acc, curr) => acc + curr.amount, 0);
    return (amount / totalIncomeTurnOver) * 100;
  });

  const category = allTransactions.map((mp) => mp.category);
  const countCategory = {};
  category.forEach((element) => {
    countCategory[element] = (countCategory[element] || 0) + 1;
  });

  const date = allTransactions.map((mp) => moment(mp.date).format("l"));

  const expenseValueFor15 = allTransactions
    .filter(
      (f) => f.type === "expense" && moment(f.date).format("l") === "1/15/2025"
    )
    .reduce((acc, curr) => (acc += curr.amount), 0);
  const expenseValueFor14 = allTransactions
    .filter(
      (f) => f.type === "expense" && moment(f.date).format("l") === "1/14/2025"
    )
    .reduce((acc, curr) => (acc += curr.amount), 0);

  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: Object.values(countCategory),
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
    },
  };

  return (
    <div className="p-2">
      <h2 className="text-3xl">Analytics</h2>
      <div className="p-3">
        <span className="text-2xl">Category Wise Analytics</span>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
          >
            <div>
              <Typography
                variant="small"
                color="gray"
                className="max-w-sm font-normal"
              >
                {Object.entries(countCategory).map((category) => {
                  return (
                    <div key={category} className="flex gap-2">
                      <span className="text-xl font-semibold">
                        {category[0]}:
                      </span>
                      <span className="text-xl font-semibold">
                        {category[1]}
                      </span>
                    </div>
                  );
                })}
              </Typography>
            </div>
          </CardHeader>
          <CardBody className="mt-4 grid place-items-center px-2">
            <Chart {...chartConfig} />
          </CardBody>
        </Card>
      </div>

      <div className="p-3">
        <span className="text-2xl">Amount Wise Analytics</span>
        <BarChart
          xAxis={[{ scaleType: "band", data: date }]}
          series={[{ data: [expenseValueFor14, expenseValueFor15] }]}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Analytics;
