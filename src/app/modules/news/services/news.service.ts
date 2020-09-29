import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Pagination } from "src/app/shared/entities/pagination.entity";
import { environment } from "../../../../environments/environment";
import { New } from "../news.entity";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  private resourceURL = environment.apiUrl + "news";

  private _news$: BehaviorSubject<Array<New>> = new BehaviorSubject<Array<New>>(
    new Array<New>()
  );
  private _archivedNews$: BehaviorSubject<Array<New>> = new BehaviorSubject<
    Array<New>
  >(new Array<New>());
  private _totalElements$: BehaviorSubject<number> = new BehaviorSubject<
    number
  >(0);

  constructor(private http: HttpClient) {}

  get news$() {
    return this._news$;
  }

  get archivedNews$() {
    return this._archivedNews$;
  }

  get totalElements() {
    return this._totalElements$;
  }
  public refreshNews() {
    const subscribe = this.http
      .get<Pagination<New>>(this.resourceURL, {
        params: {
          archiveDate: "false",
        },
      })
      .pipe(
        tap((result) => {
          this._news$.next(result.docs);
          this._totalElements$.next(result.totalDocs);
        })
      )
      .subscribe(
        () => subscribe.unsubscribe,
        () => subscribe.unsubscribe
      );
  }

  public refreshArchivedNews() {
    const subscribe = this.http
      .get<Pagination<New>>(this.resourceURL, {
        params: {
          archiveDate: "true",
          sort: "archiveDate,DESC",
        },
      })
      .pipe(
        tap((result) => {
          this._archivedNews$.next(result.docs);
          this._totalElements$.next(result.totalDocs);
        })
      )
      .subscribe(
        () => subscribe.unsubscribe,
        () => subscribe.unsubscribe
      );
  }

  public archiveNew(id: string) {
    const subscriber = this.http
      .put(this.resourceURL + "/" + id, {
        archiveDate: new Date().toISOString(),
      })
      .subscribe(
        () => {
          this.refreshArchivedNews();
          this.refreshNews();
          subscriber.unsubscribe();
        },
        () => {
          subscriber.unsubscribe();
        }
      );
  }

  public deleteNew(id: string) {
    const subscriber = this.http.delete(this.resourceURL + "/" + id).subscribe(
      () => {
        this.refreshArchivedNews();
        subscriber.unsubscribe();
      },
      () => {
        subscriber.unsubscribe();
      }
    );
  }
}
