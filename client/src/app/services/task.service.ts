import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

// instantiate headers so all http calls are json-formatted
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  // inject HttpClient so the service can make http calls to the node api
  constructor(private http: HttpClient) { }
}
