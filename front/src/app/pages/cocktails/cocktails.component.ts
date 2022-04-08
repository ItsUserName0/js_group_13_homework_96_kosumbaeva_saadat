import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.sass']
})
export class CocktailsComponent implements OnInit {
  path = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.path = <string>this.route.snapshot.routeConfig?.path;
  }

}
