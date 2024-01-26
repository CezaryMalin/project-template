document.addEventListener('DOMContentLoaded', function () {

  function generateTags() {
    const articles = document.querySelectorAll('.post');
    for (let article of articles) {
      const dataTagsWrapper = 'data-tags';
      let html = '';
      const dataTags = article.getAttribute(dataTagsWrapper);
      const splitedDataTags = dataTags.split(' ');

      for (let splitedDataTag of splitedDataTags) {
        const linkHTML = '<li><a href="#tag-' + splitedDataTag + '">' + splitedDataTag + '</a></li>';
        html = html + " " + linkHTML;
      }

      article.querySelector('.post-tags ul').innerHTML = html;
    }
  }

  generateTags();

  function generateAuthors() {
    const articles = document.querySelectorAll('.post');
    let uniqueAuthors = new Set();
    let html = '';

    for (let article of articles) {
      const dataAuthorWrapper = 'data-author';
      const dataAuthor = article.getAttribute(dataAuthorWrapper);

      if (!uniqueAuthors.has(dataAuthor)) {
        const linkHTML = '<li><a href="#author-' + dataAuthor + '">' + dataAuthor + '</a></li>';
        html = html + " " + linkHTML;
        uniqueAuthors.add(dataAuthor);
      }
    }

    document.querySelector('.authors').innerHTML = html;
  }

  generateAuthors();

  function addClickListenersToAuthors() {
    const allAuthorsElements = document.querySelectorAll('.authors li a');

    for (let authorElement of allAuthorsElements) {
      authorElement.addEventListener('click', tagClickHandler);
    }
  }

  addClickListenersToAuthors();

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const hrefAttrFromClickedEl = clickedElement.getAttribute('href');
    const author = hrefAttrFromClickedEl.replace('#author-', '');
    const allAuthorsWithActiveClass = document.querySelectorAll('.authors a.active');

    for (let authorWithActiveClass of allAuthorsWithActiveClass) {
      authorWithActiveClass.classList.remove('active');
    }

    const allAuthorsWithHrefAttribute = document.querySelectorAll('a[href^="' + hrefAttrFromClickedEl + '"]');

    for (let authorWithHrefAttribute of allAuthorsWithHrefAttribute) {
      authorWithHrefAttribute.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToTags() {
    const allTagsElements = document.querySelectorAll('.post-tags li a');

    for (let tagElement of allTagsElements) {
      tagElement.addEventListener('click', tagClickHandler);
    }
  }

  addClickListenersToTags();

  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector('.titles');
    titleList.innerHTML = '';

    const articles = document.querySelectorAll('.post' + customSelector);
    let html = '';

    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitleElement = article.querySelector('.post-title');
      const articleTitle = articleTitleElement.innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const hrefAttrFromClickedEl = clickedElement.getAttribute('href');
    const foundedArticle = document.querySelector(hrefAttrFromClickedEl);
    foundedArticle.classList.add('active');
  }
});