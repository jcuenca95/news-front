export class New {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  archiveDate: string;
  createdAt: string;
  updatedAt: string;

  constructor(obj?) {
    if (obj) {
      this._id = obj._id;
      this.title = obj.title;
      this.description = obj.description;
      this.content = obj.content;
      this.author = obj.author;
      this.createdAt = obj.createdAt;
      this.updatedAt = obj.updatedAt;
    }
  }
}
