import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailjsService {
  private serviceId = 'service_raybnrh';
  private templateId = 'template_9v2iyzt';
  private publicKey = 'usvjxdLpytFo3P3vU';

  constructor() {
    emailjs.init({ publicKey: this.publicKey });
  }
  mandarSenha(toEmail: string, password: string) {
    return emailjs.send(this.serviceId, this.templateId, {
      email: toEmail,
      password,
    });
  }
}
