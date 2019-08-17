import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private placeService: PlaceService
  ) { }

  ngOnInit() {
    this.placeService.getPlaceList('Kumari').subscribe(response => {
      console.log(response);
    });
  }

}
