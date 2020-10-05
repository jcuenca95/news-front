import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { shareReplay, tap } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { New } from "../news.entity";
import * as io from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class NewsService {
  private resourceURL = environment.apiUrl + "news";

  private _news$: Observable<Array<New>>;
  private _archivedNews$: Observable<Array<New>>;
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io(environment.websocketUrl);
    this.socket.on("refresh", (data) => {
      this.refreshNews();
    });
  }

  get news$() {
    if (!this._news$) {
      this._news$ = this.http
        .get<Array<New>>(this.resourceURL, {
          params: {
            archiveDate: "false",
          },
        })
        .pipe(shareReplay(0));
    }
    return this._news$;
  }

  get archivedNews$() {
    if (!this._archivedNews$) {
      this._archivedNews$ = this.http
        .get<Array<New>>(this.resourceURL, {
          params: {
            archiveDate: "true",
            sort: "archiveDate,DESC",
          },
        })
        .pipe(shareReplay(0));
    }
    return this._archivedNews$;
  }

  public refreshNews() {
    this._news$ = null;
  }

  public refreshArchivedNews() {
    this._archivedNews$ = null;
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
