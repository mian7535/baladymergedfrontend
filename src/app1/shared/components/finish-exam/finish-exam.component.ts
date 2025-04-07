import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-finish-exam',
  templateUrl: './finish-exam.component.html',
  styleUrls: ['./finish-exam.component.scss'],
})
export class FinishExamComponent implements OnInit {
  rate: number;
  description: any;

  constructor(public alertCtrl: AlertController, private router: Router) {}

  ngOnInit() { }

  goToNextPage() {
    this.router.navigate(['/exam']);
  }

  goBack() {
    window.history.back();
  }
}
