import { Component, OnInit } from '@angular/core';
import { covid } from 'src/app/models/covid.model';
import { CodvidService } from 'src/app/services/codvid.service';

@Component({
  selector: 'app-evolve',
  templateUrl: './evolve.component.html',
  styleUrls: ['./evolve.component.css']
})
export class EvolveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
