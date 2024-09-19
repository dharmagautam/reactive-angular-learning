import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { Player } from "../models/player";
import { AppConstants } from "../constants/constants";
import { EventSourceService } from "./event-source.service";


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  
  
  constructor(private http: HttpClient, private eventSourceService: EventSourceService) { }
  
  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${AppConstants.apiServerUrl}/players`);
  }

  getAllPlayersBlocking(): Observable<Player[]> {
    return this.http.get<Player[]>(`${AppConstants.apiServerUrl}/players/blocking`).pipe(
      shareReplay()
    );;
  }

  getAllPlayersStreams(): Observable<Player[]> {
    return this.http.get<Player[]>(`${AppConstants.apiServerUrl}/players/stream`).pipe(
      shareReplay(),
      tap(console.log)
    );
  }

  getAllPlayersReactive(): Observable<Player[]> {
    
    return this.http.get<Player[]>(`${AppConstants.apiServerUrl}/players/reactive`).pipe(
      shareReplay(),
      tap(console.log)
    );;
  }

}
