import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testing',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  onboarding: any;
  image: any;
  constructor(
    
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.onboarding = this.route.snapshot.paramMap.get('onboarding');
    this.image = this.route.snapshot.paramMap.get('image');
   }

   goToNextOnboarding(onboarding: number,image: number) {

    if(!this.checkIsLastOnboaring(onboarding,image)){
      this.router.navigate(['my-onboarding']);
      return;
    }

    if(onboarding == 0 && image == 1){
      this.router.navigate(['my-onboarding']);
      return;
    }

    this.router.navigate([`/onboarding/${onboarding}/${Number(image)+1}`]);
  }

  checkIsLastOnboaring(onboarding: number,image: number){
      if(onboarding == 1 && image == 7){ 
        return false;
      }else if(onboarding == 2 && image == 12){
        return false;
      }else if(onboarding == 3 && image == 9){
        return false;
      }else if(onboarding == 4 && image == 9){
        return false;
      }else if(onboarding == 5 && image == 3){
        return false;
      }else{
        return true;        
      }

      return true;
  }

  ngOnInit() {
  }

}
