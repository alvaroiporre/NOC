import fs from "fs";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach( path => {
      if ( fs.existsSync( path )) return;
      fs.writeFileSync( path, '');
    });


  };

  async saveLog(newLog: LogEntity): Promise<void> {

    const logAsJson = JSON.stringify(newLog)

    fs.appendFileSync(this.allLogsPath, `${logAsJson}\n`);

    if ( newLog.level === LogSeverityLevel.low ) return;

    if ( newLog.level === LogSeverityLevel.medium ) {
      fs.appendFileSync(this.mediumLogsPath, `${logAsJson}\n`);
    } else {
      fs.appendFileSync(this.highLogsPath, `${logAsJson}\n`);
    }
  }
  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}
