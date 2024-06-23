import cron from "node-cron";

const exportData = () => {
  const name = "Sales report 1";
  const path = "/home/username/sales_report_1.csv";
  console.log(`Exporting ${name} data to ${path}`);
};

cron.schedule("*/5 * * * * *", () => {
  exportData(); // Call the dataExport function
});

console.log("Scheduler is running...");
