import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  achievements = [
    { title: 'Primer Logro', description: 'Completó el primer reto', user: 'Juan' },
    { title: 'Reto Diario', description: 'Completó el reto del día', user: 'Maria' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
