import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exam-passed',
  templateUrl: './exam-passed.component.html',
  styleUrls: ['./exam-passed.component.scss'],
})
export class ExamPassedComponent implements OnInit {

  constructor(private router: Router) { }

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
