import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from 'src/app/services/custom-http.service';
import { SharingService } from 'src/app/services/sharing.service';
import { User } from 'src/app/models/user';
import { Player } from '@angular/core/src/render3/interfaces/player';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sidebarcoach',
  templateUrl: './sidebarcoach.component.html',
  styleUrls: ['./sidebarcoach.component.css']
})
export class SidebarcoachComponent implements OnInit {

  constructor(private customHttp: CustomHttpService) { }

  playerName : string;
  teamName : string;
  playerNumber : number;
  loggedUser : User;
  players : Player[];

  ngOnInit() {
    this.getUserName();
    this.getPlayers();
  }

  getUserName(){
    this.customHttp.get('/getName').subscribe((value : any) => {
      this.loggedUser = value;
    });
  }

  getPlayers(){
    this.customHttp.get('/players').subscribe((value : any) => {
      this.players = value;
    })
  }

  insertPlayerToTeam()
  {
    this.customHttp.post('/addPlayer', {playerName : this.playerName, playerNumber : this.playerNumber, teamName: this.loggedUser.teamname}).subscribe(
      (value : any)  => {
        console.log(value);
      }
    )
  }

  reloadPage(){
    window.location.reload();
  }

}
