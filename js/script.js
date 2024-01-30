document.addEventListener('DOMContentLoaded', function () {
  const opts = {
    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    tagListSelector: '.tags.list',
    authorListSelector: '.authors.list',
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-'
    }
  };

  let tagsParams = { min: 0, max: 0 };

  function calculateParams(items) {
    let min = Infinity, max = -Infinity;

    for (let item in items) {
      if (items[item] < min) {
        min = items[item];
      }
      if (items[item] > max) {
        max = items[item];
      }
    }

    return { min, max };
  }

  function calculateClass(count, params, classCount) {
    if (isNaN(count) || isNaN(params.min) || isNaN(params.max)) {
      return ''; // Returning an empty string for invalid values
    }
    const classNumber = Math.floor((count - params.min) / (params.max - params.min + 1) * classCount) + 1;
    return opts.tagSizes.classPrefix + classNumber;
  }

  function generateTags() {
    let allTags = {};
    const articles = document.querySelectorAll(opts.articleSelector);

    for (let article of articles) {
      const dataTagsWrapper = 'data-tags';
      const dataTags = article.getAttribute(dataTagsWrapper);
      const splitedDataTags = dataTags.split(' ');

      for (let splitedDataTag of splitedDataTags) {
        if (!allTags[splitedDataTag]) {
          allTags[splitedDataTag] = 1;
        } else {
          allTags[splitedDataTag]++;
        }
      }
    }

    tagsParams = calculateParams(allTags);

    const tagList = document.querySelector(opts.tagListSelector);

    for (let article of articles) {
      const dataTagsWrapper = 'data-tags';
      let html = '';
      const dataTags = article.getAttribute(dataTagsWrapper);
      const splitedDataTags = dataTags.split(' ');

      for (let splitedDataTag of splitedDataTags) {
        const linkHTML = '<li class="' + calculateClass(allTags[splitedDataTag], tagsParams, opts.tagSizes.count) + '"><a href="#tag-' + splitedDataTag + '">' + splitedDataTag + ' (' + allTags[splitedDataTag] + ')</a></li>';
        html += linkHTML;
      }

      article.querySelector('.post-tags ul').innerHTML = html;
    }

    for (let tag in allTags) {
      const tagLinkHTML = '<li class="' + calculateClass(allTags[tag], tagsParams, opts.tagSizes.count) + '"><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
      tagList.innerHTML += tagLinkHTML;
    }
  }

  generateTags();

  function generateAuthors() {
    let allAuthors = {};
    const articles = document.querySelectorAll(opts.articleSelector);

    for (let article of articles) {
      const dataAuthorWrapper = 'data-author';
      const dataAuthor = article.getAttribute(dataAuthorWrapper);

      if (!allAuthors[dataAuthor]) {
        allAuthors[dataAuthor] = 1;
      } else {
        allAuthors[dataAuthor]++;
      }
    }

    calculateParams(allAuthors);

    const authorList = document.querySelector(opts.authorListSelector);
    let allAuthorsHTML = '';

    for (let author in allAuthors) {
      const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')</a></li>';
      allAuthorsHTML += authorLinkHTML;
    }

    authorList.innerHTML = allAuthorsHTML;
  }

  generateAuthors();

  function addClickListenersToAuthors() {
    const allAuthorsElements = document.querySelectorAll(opts.authorListSelector + ' li a');

    for (let authorElement of allAuthorsElements) {
      authorElement.addEventListener('click', authorClickHandler);
    }
  }

  addClickListenersToAuthors();

  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const hrefAttrFromClickedEl = clickedElement.getAttribute('href');
    const author = hrefAttrFromClickedEl.replace('#author-', '');
    const allAuthorsWithActiveClass = document.querySelectorAll(opts.authorListSelector + ' li a.active');

    for (let authorWithActiveClass of allAuthorsWithActiveClass) {
      authorWithActiveClass.classList.remove('active');
    }

    clickedElement.classList.add('active');
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToTags() {
    const allTagsElements = document.querySelectorAll(opts.tagListSelector + ' li a');

    for (let tagElement of allTagsElements) {
      tagElement.addEventListener('click', tagClickHandler);
    }
  }

  addClickListenersToTags();

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const hrefAttrFromClickedEl = clickedElement.getAttribute('href');
    const tag = hrefAttrFromClickedEl.replace('#tag-', '');
    const allTagsWithActiveClass = document.querySelectorAll(opts.tagListSelector + ' li a.active');

    for (let tagWithActiveClass of allTagsWithActiveClass) {
      tagWithActiveClass.classList.remove('active');
    }

    clickedElement.classList.add('active');
    generateTitleLinks('[data-tags*="' + tag + '"]');
  }

  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(opts.titleListSelector);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(opts.articleSelector + customSelector);
    let html = '';

    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitleElement = article.querySelector(opts.titleSelector);
      const articleTitle = articleTitleElement.innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html += linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll(opts.titleListSelector + ' a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll(opts.titleListSelector + ' a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const hrefAttrFromClickedEl = clickedElement.getAttribute('href');
    const foundedArticle = document.querySelector(hrefAttrFromClickedEl);
    foundedArticle.classList.add('active');
  }
});