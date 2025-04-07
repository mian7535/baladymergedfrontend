import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-give-feedback',
  templateUrl: './give-feedback.component.html',
  styleUrls: ['./give-feedback.component.scss'],
})
export class GiveFeedbackComponent implements OnInit {
  @Output() submitFeedback = new EventEmitter<any>();
  rate: number;
  description: any;

  constructor(
    public alertCtrl: AlertController,
    private translationService: TranslateService,
  ) {}

  ngOnInit() {}

  submitData() {
    this.submitFeedback.emit(true);
  }

  async showAlert() {
    if (!this.rate) {
      const currentLang = this.translationService.currentLang;
      const translation = this.translationService.translations[currentLang];
      const alert = await this.alertCtrl.create({
        cssClass: 'alert-model',
        message: translation['You must submit the rating to unlock the exam'],
        buttons: [translation.Ok],
      });
      await alert.present();
    } else {
      this.submitData();
    }
  }

  clickOutsideBtnHandler(data: any) {}
}
