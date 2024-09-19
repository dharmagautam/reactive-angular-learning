import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Player } from '../../models/player';
import { EventSourceService } from '../../service/event-source.service';

@Component({
  selector: 'app-home-page-reactive',
  templateUrl: './home-page-reactive.component.html',
  styleUrl: './home-page-reactive.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageReactiveComponent {

  mumbai: Player[] = [];
  chennai: Player[] = [];
  rcb: Player[] = [];

  constructor(private eventSourceService: EventSourceService, private cdr: ChangeDetectorRef) {

    let player$ = this.eventSourceService.connectToServerSentEvents();
    player$.subscribe({
      next: player => {
        console.log(player)
        if(player.team === 'MI') {
          this.mumbai.push(player);
        }
        if(player.team === 'CSK') {
          this.chennai.push(player);
        }
        if(player.team === 'RCB') {
          this.rcb.push(player);
        }
        this.cdr.detectChanges();
      },
      error: error => console.log(error)
    });
  }
}
