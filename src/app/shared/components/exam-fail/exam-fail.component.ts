import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-exam-fail',
  templateUrl: './exam-fail.component.html',
  styleUrls: ['./exam-fail.component.scss'],
})
export class ExamFailComponent implements OnInit {
  @Input() totalQuestion: number;
  @Input() rightQuestion: number;
  @Input() result: any;

  constructor(private router: Router, private nav: NavController) {}

  ngOnInit() {}

  navigateTo() {
    this.nav.navigateRoot(['/dashboard/reload']);
  }
}
