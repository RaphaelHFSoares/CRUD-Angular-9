import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { Product } from './product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //baseUrl = "http://localhost:3000/products";
  baseUrl='http://localhost:8088/v1';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    const url = `${this.baseUrl+'/save'}`;
    return this.http.post<Product>(url, product).pipe(
      map(obj => obj), catchError(e => this.errorHandle(e)));
  }

  read(): Observable<Product[]> {
    const url = `${this.baseUrl +'/find-products'}`;
    return this.http.get<Product[]>(url).pipe(
      map(obj => obj), catchError(e => this.errorHandle(e)));
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product);
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }

  errorHandle(e: any): Observable<any> {
    this.showMessage('Ocorreu um erro !!', true)
    return EMPTY
  }

}
