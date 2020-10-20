import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RegisterService} from '../../register.service';
import{Profile} from '../../models/profile';
@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  OwnerArray : Profile[] = [];
  data = false;
  mySubscription : any;
  oldData: any;
modal:any;
  constructor(private router : Router, private LandlordsServeService : RegisterService) {

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

    this.LandlordsServeService.GetProfile(localStorage.getItem("UserEmail")).subscribe((data) => 
    data.forEach(element => { 
  
      var owner = new Profile();
     // owner.Description = element.Description;
      owner.Email = element.Email;
      owner.Name = element.Name;
      owner.Surname = element.Surname;
      owner.Role = element.Role;
      
      this.oldData = element;
      this.OwnerArray.push(owner);
    })
    )
  }//ngOnInit
 
}//Oninit