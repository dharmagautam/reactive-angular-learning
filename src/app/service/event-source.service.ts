import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/constants';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class EventSourceService {

  constructor(private zone: NgZone) { }

  connectToServerSentEvents(): Observable<Player> {
    const url = `${AppConstants.apiServerUrl}/players/reactive`;
    return new Observable<Player>((observer) => {
      let eventSource = new EventSource(url);

      console.log("here")
      console.log(eventSource)

      eventSource.onmessage = (event) => {
        this.zone.run(() => {
          console.debug('Received event: ', event);
          let json = JSON.parse(event.data);
          observer.next(new Player(json['id'], json['firstName'], json['lastName'], json['team']));
        });
      };
      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way 
        // of detecting the end of the stream is to insert a special element
        // in the stream of events, which the client can identify as the last one.
        this.zone.run(() => {
          if (eventSource.readyState === 0) {
            console.log('The stream has been closed by the server.');
            eventSource.close();
            observer.complete();
          } else {
            observer.error('EventSource error: ' + error);
          }
        });
      }
    });
  }
}

