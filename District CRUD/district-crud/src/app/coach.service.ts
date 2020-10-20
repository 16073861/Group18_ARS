import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Coach } from './models/coach';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  url : string;
  header : any;
  option : any;

  constructor(private http : HttpClient) {
    this.url = 'http://localhost:6087/api/System/';
    const headerSettings: {[name: string]: string | string[]; } = {}; 
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.option = {headers : headers};
  }
  getOwners():Observable<Coach[]> { return this.http.get<Coach[]>(this.url + 'getAllUsers/'); }

  addOwner(newOwner : Coach){ return this.http.post(this.url + 'addUsers/' , newOwner); }

  /*UpdateOwner(id, emp) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
    return this.http.put('https://localhost:6087/api/System/' + id,
      body,
      requestOptions).map(res => res.json());
  }*/
  UpdateOwner(coach:Coach ,id:number)
  { return this.http.put(this.url + `UpdateOwner{id}?id=${id}`,coach); }

  getUser(id:number):Observable<User[]> 
  { return this.http.get<User[]>(this.url + `getUser?id= ${id}`); }

  DeleteOwner(id : number)
  { console.log(id)
    return this.http.delete(this.url + `DeleteCoach?id= ${id}`); }
 /* DeleteOwner(id: number) {
    return this.http.delete('https://localhost:6087/api/System/DeleteOwner/?id=' + id).map(res => res.json());
  }*/
}
