import { Component, OnInit} from '@angular/core';
import { SharingService } from '../../services/sharing.service';
import { CustomHttpService } from 'src/app/services/custom-http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cname : string;
  cpassword : string;

  constructor(private sharingService: SharingService,
    private customHttp: CustomHttpService,
    private router: Router,
    private toastrService: ToastrService) {
  }


  ngOnInit() {
  }

  LoggedIn()
  {
    this.customHttp.post('/logUser', {name: this.cname, password: this.cpassword}).subscribe(
      (value: any) => {
        if(value == 0)
        {
          this.sharingService.setAdminOptions();
          localStorage.setItem('token', 'admintoken');
          this.router.navigate(['admin']);
          this.sharingService.setLoggedIn();
          this.toastrService.success("Successfully logged in as admin!");
        }
        else if(value == 1)
        {
          this.toastrService.success("Successfully logged in as coach");
          localStorage.setItem('token', 'coachtoken');
          this.router.navigate(['coach']);
          this.sharingService.setUserOptions();
          this.sharingService.setLoggedIn();
        }
        else if(value == -1)
        {
          this.toastrService.error("Sorry, this account is not existing!");
        }
      }
    )
    
  }

}
