import { ajax } from 'rxjs/ajax';
import { map, catchError, concatMap } from 'rxjs/operators';
import { of, from, Subject, interval, range, Observable } from 'rxjs';

//const url = 'http://localhost:7070/messages/unread';
const url = 'https://ahj-11-rxjs-polling-server.herokuapp.com/messages/unread';


function getRequest(url) {
  return new Observable(observer => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        observer.next(data.messages);
        observer.complete();
      })
      .catch(err => observer.error(err));
    return () => controller.abort();
  });
}

interval(1000)
  .pipe(concatMap((i) => getRequest(url)))
  .subscribe(value => console.log(value));

/*
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
*/