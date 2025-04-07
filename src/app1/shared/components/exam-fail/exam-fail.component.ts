import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-fail',
  templateUrl: './exam-fail.component.html',
  styleUrls: ['./exam-fail.component.scss'],
})
export class ExamFailComponent implements OnInit {
  @Input() totalQuestion: number;
  @Input() rightQuestion: number;
  @Input() result: any;

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateTo() {
    this.router.navigate(['/my-courses']);
  }
}
