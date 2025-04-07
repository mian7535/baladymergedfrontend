import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() showSecondaryHeader = false;
  currentLang: any;
  constructor(private router: Router) {
    this.currentLang = window.localStorage.getItem('currentLang');
  }

  ngOnInit() { }

  goBack() {
    window.history.back();
  }

  goToHome() {
    this.router.navigate([`/dashboard`]);
  }
}
