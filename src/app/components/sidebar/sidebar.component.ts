import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from 'src/app/services/custom-http.service';
import { Game } from 'src/app/models/game';
import { Toast, ToastrService } from 'ngx-toastr';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private customHttp : CustomHttpService,
    private sharingService: SharingService,
    private toastrService: ToastrService) { }
  
  allgames : Game[] = [];
  homeTEAM : string;
  guestTeam : string;
  ht : string;
  gt : string;
  homeScore : number;
  guestScore : number;
  

  ngOnInit() {
      this.customHttp.get('/games').subscribe(
        (value : any) => {
          this.allgames = value;
        }
      )
  }

  addGame()
  {
    this.customHttp.post('/addGame', {homeTeam : this.homeTEAM , guestTeam : this.guestTeam}).subscribe(
      (value : any)  => {
        if(value == true) this.toastrService.success("Successfully inserted game");
        else this.toastrService.error("Game was not inserted, please check teams again");
        this.reloadPage();
      }
    )
  }

  setScore()
  {
    this.customHttp.post('/setScore', {homeTeam: this.ht, guestTeam: this.gt, homeScore: this.homeScore, guestScore: this.guestScore}).subscribe(
      (value : any) => {
        console.log(value);
        if(value == true) this.toastrService.success("Score set succesfully!");
        else this.toastrService.error("Score was not set, please check teams again");
        this.reloadPage();
      }
    )
  }

  deleteGame(gameId : number)
  {
    if(confirm('Do you really want to delete this game?'))
    {
     this.customHttp.delete('/deleteGame' + "?gameId=" + gameId).subscribe((value : any) => {
      if(value != 0) this.toastrService.success("Game deleted successfully!");
      else this.toastrService.error("Game was not deleted!");
      this.reloadPage();
     });
    }
    else
    {
      
    }
  }

  reloadPage(){
    window.location.reload();
  }

  logOut()
  {
    localStorage.clear();
  }


}
