import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

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

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = []} = options;

    try {

      const sentInformation = await this.transporter.sendMail({to, subject, attachments, html: htmlBody});

      console.log(sentInformation);

      return true;
    } catch (error) {
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

    this.sendEmail({
      to, subject, attachments, htmlBody
    })

  }

}