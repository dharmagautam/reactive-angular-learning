import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, map, scan, shareReplay, startWith, tap } from 'rxjs';
import { Player } from '../../models/player';
import { EventSourceService } from '../../service/event-source.service';

@Component({
  selector: 'app-home-page-obser',
  templateUrl: './home-page-obser.component.html',
  styleUrl: './home-page-obser.component.css'
})

export class HomePageObserComponent {
  mumbai$: Observable<Player[]>;
  chennai$: Observable<Player[]>;
  rcb$: Observable<Player[]>;
  completeData$: Observable<Player[]>;

  constructor(private eventSourceService: EventSourceService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {

    this.completeData$ = this.eventSourceService.connectToServerSentEvents().pipe(
      scan((acc, curr) => [...acc, curr], []),
      startWith([]),
      shareReplay()
    );

    //this.completeData$.subscribe(player => console.log(player))

    this.mumbai$ = this.completeData$.pipe(
      map(players => players.filter(player => player.team === 'MI')),
      tap(player => console.log(player))
    );
    this.chennai$ = this.completeData$.pipe(
      map(players => players.filter(player => player.team === 'CSK'))
    );
    this.rcb$ = this.completeData$.pipe(
      map(players => players.filter(player => player.team === 'RCB'))
    );
  }
}
