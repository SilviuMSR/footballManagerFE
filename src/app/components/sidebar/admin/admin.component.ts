import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { CustomHttpService } from 'src/app/services/custom-http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private customHttp: CustomHttpService) { }

  allteams : Team[] = [];

  ngOnInit() {
    this.customHttp.get('/teams').subscribe((value : any) => {
      this.allteams = value;
    });
  }

}
