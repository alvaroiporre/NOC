import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}


export class EmailService {

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  constructor (
  ) {}



  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = []} = options;

    try {

      const sentInformation = await this.transporter.sendMail({to, subject, attachments, html: htmlBody});

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'Email sent',
        origin: 'email.service.ts'
      });

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Email not sent: ${error}`,
        origin: 'email.service.ts'
      });
      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = 'Logs del server';
    const htmlBody = `
    <h1>logs del sistema </h1>
    <p>loremipsasdfadsfad a sdff adfa asdfs sd sdfsdfsd ssd sdf adfa sfads ads asdf</p>
    `;

    const attachments:Attachment[] = [
      {filename: 'logs-all.log', path: './logs/logs-all.log'},
      {filename: 'logs-high.log', path: './logs/logs-high.log'},
    ];

    return this.sendEmail({
      to, subject, attachments, htmlBody
    })

  }

}