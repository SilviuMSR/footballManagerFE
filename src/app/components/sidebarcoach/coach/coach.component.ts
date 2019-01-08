import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { CustomHttpService } from 'src/app/services/custom-http.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {

  allteams : Team[] = [];

  constructor(private customHttp: CustomHttpService) { }

  ngOnInit() {
    this.customHttp.get('/teams').subscribe((value : any) => {
      this.allteams = value;
    });
  }

}
