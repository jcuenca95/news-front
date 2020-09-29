import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { New } from "src/app/modules/news/news.entity";

@Component({
  selector: "app-new-card",
  templateUrl: "./new-card.component.html",
  styleUrls: ["./new-card.component.scss"],
})
export class NewCardComponent implements OnInit {
  @Input() newEntity: New;
  @Output() clickArchive: EventEmitter<New> = new EventEmitter<New>();
  @Output() clickDelete: EventEmitter<New> = new EventEmitter<New>();

  constructor() {}

  ngOnInit() {}

  emitArchive() {
    this.clickArchive.emit(this.newEntity);
  }
  emitDelete() {
    this.clickDelete.emit(this.newEntity);
  }
}
