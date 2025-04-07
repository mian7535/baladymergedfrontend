import { Component, Input, OnInit } from '@angular/core';
import { Router,NavigationEnd  } from '@angular/router';
import { Location } from "@angular/common";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() showSecondaryHeader = false;
  currentLang: any;

  private history: string[] = [];
 
  constructor(private router: Router, private location: Location) {

    this.currentLang = window.localStorage.getItem('currentLang');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() { }


  goToHome() {
    this.router.navigate([`/dashboard`]);
  }

  back(): void {
    if (this.location.path() === '/dashboard' || this.location.path() === '') {
      // If on the home page, navigate to a specific route or handle as needed
      this.router.navigate(['/']);
    } else {
      // Go back in history
      window.history.back();
    }
  }
}
