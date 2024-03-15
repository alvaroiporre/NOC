import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { LogRepository } from "../domain/repository/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SenEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const logRepository = new LogRepositoryImpl( 
  //new FileSystemDatasource(),
  //new MongoLogDatasource(),
  new PostgresLogDatasource(),
  );
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    //Mandar Email
    // new SenEmailLogs(emailService, fileSystemLogRepository).execute(['tecno_economica@hotmail.com', 'alvaroiporremartinez@gmail.com']);
    

    CronService.createJob("*/5 * * * * *", () => {
      const url = 'https://google.com';
      new CheckService(logRepository,
        () => console.log('success'),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
