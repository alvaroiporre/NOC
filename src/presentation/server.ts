import { envs } from "../config/plugins/envs.plugin";
import { LogRepository } from "../domain/repository/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SenEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasource());
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log("Server started...");

    //Mandar Email
    // new SenEmailLogs(emailService, fileSystemLogRepository).execute(['tecno_economica@hotmail.com', 'alvaroiporremartinez@gmail.com']);


    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = 'https://google.com';
    //   new CheckService(fileSystemLogRepository,
    //     () => console.log('success'),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
