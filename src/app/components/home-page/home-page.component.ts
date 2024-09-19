import { Component } from '@angular/core';
import { Player } from '../../models/player';
import { PlayerService } from '../../service/player.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  mumbai: Player[];
  chennai: Player[];
  rcb: Player[];
  completeData$: Player[] = [];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.playerService.getAllPlayersBlocking().subscribe({
      next: payload => {
        this.completeData$ = payload as Player[];
        this.mumbai = this.completeData$.filter(player => player.team === 'MI');
        this.chennai = this.completeData$.filter(player => player.team === 'CSK');
        this.rcb = this.completeData$.filter(player => player.team === 'RCB');
      }
    });
  }

}
