import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasource());


export class Server {
  public static start() {
    console.log("Server started...");

    //Mandar Email
    const emailService = new EmailService();
    // emailService.sendEmail({to: 'tecno_economica@hotmail.com', subject: 'testing nodemailer', htmlBody: '<h2>Logs del sistema</h2>'})

    // emailService.sendEmailWithFileSystemLogs(['tecno_economica@hotmail.com', 'alvaroiporremartinez@gmail.com']);

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = 'https://google.com';
    //   new CheckService(fileSystemLogRepository,
    //     () => console.log('success'),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });
  }
}
