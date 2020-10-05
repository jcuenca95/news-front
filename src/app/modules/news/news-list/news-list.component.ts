import { animate, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTabChangeEvent, MatTabGroup } from "@angular/material";
import { New } from "../news.entity";
import { NewsService } from "../services/news.service";

@Component({
  selector: "app-news-list",
  templateUrl: "./news-list.component.html",
  styleUrls: ["./news-list.component.scss"],
  animations: [
    trigger("newAnimation", [
      transition("void => *", [
        style({
          height: 0,
          opacity: 0,
          transform: "scale(0.85)",
          "margin-bottom": 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        }),
        animate(
          "50ms",
          style({
            height: "*",
            "margin-bottom": "*",
            paddingTop: "*",
            paddingBottom: "*",
            paddingRight: "*",
            paddingLeft: "*",
          })
        ),
        animate(200),
      ]),
    ]),
  ],
})
export class NewsListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;

  constructor(private newsService: NewsService) {}

  ngAfterViewInit(): void {
    this.refreshData({ index: 0, tab: null });
  }

  ngOnInit() {}

  get news$() {
    return this.newsService.news$;
  }

  get archivedNews$() {
    return this.newsService.archivedNews$;
  }

  public refreshData($event: MatTabChangeEvent) {
    if ($event.index == 0) {
      this.newsService.refreshNews();
    } else {
      this.newsService.refreshArchivedNews();
    }
  }

  public archiveNew(newEntity: New) {
    this.newsService.archiveNew(newEntity._id);
  }

  public deleteNew(newEntity: New) {
    this.newsService.deleteNew(newEntity._id);
  }
}
