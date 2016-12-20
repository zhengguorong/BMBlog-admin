export default class Article {
  constructor ({ title = '无标题文章', markdown = '# hello', author = '' } = {}) {
    this.title = title
    this.markdown = markdown
    this.author = author
  }
}
