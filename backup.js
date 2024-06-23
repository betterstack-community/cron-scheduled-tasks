import { spawn } from "child_process";
import { format } from "date-fns";

const dbName = "movies.db";

const getFormattedDateTime = () => {
  return format(new Date(), "yyyy-MM-dd_HH-mm-ss");
};

const backupDatabase = async () => {
  return new Promise((resolve, reject) => {
    const currentDateTime = getFormattedDateTime();
    const backupFileName = `./backup-${currentDateTime}.sqlite`;

    console.log(`Starting database backup: ${backupFileName}`);

    const backupProcess = spawn("sqlite3", [
      dbName,
      `.backup ${backupFileName}`,
    ]);

    backupProcess.on("error", (err) => {
      reject(new Error(`Failed to start backup process: ${err.message}`));
    });

    backupProcess.on("exit", (code, signal) => {
      if (code) {
        reject(new Error(`Backup process exited with code ${code}`));
      } else if (signal) {
        reject(
          new Error(`Backup process was terminated with signal ${signal}`)
        );
      } else {
        console.log(
          `Database "${dbName}" successfully backed up to ${backupFileName}`
        );
        resolve();
      }
    });
  });
};

backupDatabase().catch((err) => console.error(err));
