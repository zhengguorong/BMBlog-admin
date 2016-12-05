export default class Article {
  constructor (title, markdown, html, createDate, author) {
    this.title = title || '无标题文章'
    this.markdown = markdown || '# hello'
    this.html = html
    this.author = author
  }
}
