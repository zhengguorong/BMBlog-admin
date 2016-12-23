export default class Article {
  constructor ({ title = '# hello', markdown = '# hello', author = '' } = {}) {
    this.title = title
    this.markdown = markdown
    this.author = author
  }
}
