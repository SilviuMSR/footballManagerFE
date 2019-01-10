import { Component, OnInit } from '@angular/core';
import { CustomHttpService } from 'src/app/services/custom-http.service';
import { SharingService } from 'src/app/services/sharing.service';
import { User } from 'src/app/models/user';
import { Player } from '@angular/core/src/render3/interfaces/player';
import { HttpHeaders } from '@angular/common/http';
import { Game } from 'src/app/models/game';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebarcoach',
  templateUrl: './sidebarcoach.component.html',
  styleUrls: ['./sidebarcoach.component.css']
})
export class SidebarcoachComponent implements OnInit {

  constructor(private customHttp: CustomHttpService,
    private toastrService : ToastrService) { }

  playerName : string;
  teamName : string;
  playerNumber : number;
  loggedUser : User;
  players : Player[];
  games : Game[];
 
  ngOnInit() {
    this.getUserName();
  }

  getUserName(){
    this.customHttp.get('/getName').subscribe((value : any) => {
      this.loggedUser = value;
      this.getPlayers();
      this.getTeamGames();
    });
  }

  getPlayers(){
    this.customHttp.post('/teamPlayers', {teamName : this.loggedUser.teamname}).subscribe((value : any) => {
      this.players = value;
      
    })
  }

  getTeamGames()
  {
    this.customHttp.post('/teamGames', {guestTeam: this.loggedUser.teamname, homeTeam: this.loggedUser.teamname}).subscribe((value : any) => {
      this.games = value;
    })
  }

  insertPlayerToTeam()
  {
    this.customHttp.post('/addPlayer', {playerName : this.playerName, playerNumber : this.playerNumber, teamName: this.loggedUser.teamname}).subscribe(
      (value : any)  => {
        if(value == true) this.toastrService.success("Player added succesfully!");
        else this.toastrService.error("Player was not added to team, please try again!");
        this.reloadPage();
      }
    )
  }

  deletePlayerFromTeam(playerId : number) 
  {
      if(confirm('Do you really want to delete this player?'))
      {
       this.customHttp.delete('/deletePlayer' + "?playerId=" + playerId).subscribe((value : any) => {
        if(value != 0) this.toastrService.success("Player deleted succesfully!");
        else this.toastrService.error("Player was not deleted!");
        this.reloadPage();
       });
      }
      else
      {
        this.toastrService.error("Player was not deleted!");
        this.reloadPage();
      }
  }

  reloadPage(){
    window.location.reload();
  }

  logOut()
  {
    localStorage.clear();
    this.players = [];
    this.loggedUser = null;
  }

}
