import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, startWith, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiResponse } from './model/api-response';
import { Page } from './model/page';
import { PeopleService } from './service/people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kuehne-nagel-assessment-frontend';

  responseState: Observable<{ appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse }>;
  initResponse = new BehaviorSubject<ApiResponse<Page>>(null);
  private initCurrentPage = new BehaviorSubject<number>(0);
  currentPage$ = this.initCurrentPage.asObservable();

  constructor(private peopleService: PeopleService) { }

  ngOnInit(): void {
    this.responseState = this.peopleService.getContacts().pipe(
      map((res: ApiResponse<Page>) => {
        console.log(res);
        this.initResponse.next(res);
        return ({ appState: 'APPLICATION_LOADED', appData: res });
      }),
      startWith({ appState: 'APPLICATION_LOADING' }),
      catchError((error: HttpErrorResponse) => of({ appState: 'APPLICATION_ERROR', error }))
    )
  }

  loadSelectedPage(name?: string, pageNumber?: number): void {
    this.responseState = this.peopleService.getContacts(name, pageNumber).pipe(
      map((res: ApiResponse<Page>) => {
        console.log(res);
        this.initResponse.next(res);
        return ({ appState: 'APPLICATION_LOADED', appData: res });
      }),
      startWith({ appState: 'APPLICATION_LOADED', appData: this.initResponse.value }),
      catchError((error: HttpErrorResponse) => of({ appState: 'APPLICATION_ERROR', error }))
    )
  }

  loadNextPreviousPage(direction?: string, name?: string): void {
    this.loadSelectedPage(name, direction === 'forward' ? this.initCurrentPage.value + 1 : this.initCurrentPage.value - 1);
  }
}
