import { ajax } from 'rxjs/ajax';
import { map, catchError } from 'rxjs/operators';
import { of, from, Subject, interval } from 'rxjs';

const url = 'https://ahj-11-rxjs-polling-server.herokuapp.com/messages/unread';

// const url = 'http://localhost:7070/messages/unread';

//const stream$ = new Subject();

const obs$ = ajax({
  url: url,
  method: 'GET'
}).pipe(
  map(value => value.response.messages),
  catchError(error => {
    console.log('error: ', error);
    return of(error);
  })
);


from(obs$).subscribe(value => console.log(value));