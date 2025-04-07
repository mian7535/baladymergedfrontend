import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam-completed',
  templateUrl: './exam-completed.component.html',
  styleUrls: ['./exam-completed.component.scss'],
})
export class ExamCompletedComponent implements OnInit {
  @Input() totalQuestion: number;
  @Input() rightQuestion: number;
  constructor(private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {}

  navigateTo() {
    this.router.navigate(['/dashboard']);
  }

  downloadCertificate() {
    let userId = '';
    let lang = '';
    if (window.localStorage.getItem('userLoggedInBalady')) {
      userId = JSON.parse(window.localStorage.getItem('userLoggedInBalady')).id;
      lang = JSON.parse(window.localStorage.getItem('currentLang'));
    }
    const api = environment.apiEndpoint.split('/');
    api.pop();
    api.push(`student/generate-certificate?user_id=${userId}&lang=${lang}`);
    window.open(api.join('/'));
  }
}
