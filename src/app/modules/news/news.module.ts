import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewsListComponent } from "./news-list/news-list.component";
import { RouterModule } from "@angular/router";
import { NewsService } from "./services/news.service";
import { HttpClientModule } from "@angular/common/http";
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTabsModule,
} from "@angular/material";
import { NewCardComponent } from "./new-card/new-card.component";

@NgModule({
  declarations: [NewsListComponent, NewCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: "",
        component: NewsListComponent,
        pathMatch: "full",
      },
    ]),
  ],
  providers: [NewsService],
})
export class NewsModule {}
