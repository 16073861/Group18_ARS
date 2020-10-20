import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CoachService} from '../../coach.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-get-profile',
  templateUrl: './get-profile.component.html',
  styleUrls: ['./get-profile.component.css']
})
export class GetProfileComponent implements OnInit {

  OwnerArray : User[]=[];
  data = false;
  mySubscription : any;
  obj:User;

  constructor(private router : Router, private LandlordsServeService : CoachService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded //
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.LandlordsServeService.getUser(this.obj.User_ID).subscribe(data => data.forEach(element => { 
  
      var owner = new User();
      owner.User_role = element.User_role;
      owner.Email = element.Email;
      owner.Type_ID=element.Type_ID;
      owner.Name = element.Name;
      owner.Surname = element.Surname;
      owner.User_ID = element.User_ID;
      
  
     this.OwnerArray.push(owner);
    }))
  }

  EditOwner(user){
    localStorage.setItem('user', JSON.stringify(user))
    this.router.navigate(['/profile' ])
  }//EditOwner

  DeleteOwner(id : number){
    console.log( id);
    this.LandlordsServeService.DeleteOwner(id).subscribe(() => {

      this.data = true;

      this.router.navigate(['/coach-read']);
    })
  }//DeleteOwner

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }//Endif
  }//ngOnDestroy

}
