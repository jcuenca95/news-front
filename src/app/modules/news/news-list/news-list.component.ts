import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatTabChangeEvent, MatTabGroup } from "@angular/material";
import { New } from "../news.entity";
import { NewsService } from "../services/news.service";

@Component({
  selector: "app-news-list",
  templateUrl: "./news-list.component.html",
  styleUrls: ["./news-list.component.scss"],
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
