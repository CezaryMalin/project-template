
'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  const optArticleTagsSelector = '.post-tags .list li';  
  


  function generateTitleLinks(customSelector = ''){
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitleElement = article.querySelector(optTitleSelector);
    const articleTitle = articleTitleElement.innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
}

generateTitleLinks();

const titleClickHandler = function (event) {
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
};

const links = document.querySelectorAll('.titles a');
for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    
  
    /* find tags wrapper */
    const dataTagsWrapper = 'data-tags';

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const dataTags = article.getAttribute(dataTagsWrapper);
    
    /* split tags into array */
    const splitedDataTags = dataTags.split(' ');

    /* START LOOP: for each tag */
    for (let splitedDataTag of splitedDataTags) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-'+splitedDataTag+'">'+ splitedDataTag +'</a></li>';
      
      /* add generated code to html variable */
      html = html + " " + linkHTML;

    /* END LOOP: for each tag */
    }  

    /* insert HTML of all the links into the tags wrapper */
    article.querySelector('ul').innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefAttrFromClickedEl = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = hrefAttrFromClickedEl.replace('#tag-', '');
  
  /* find all tag links with class active */
  const allTagsWithActiveClass = document.querySelectorAll("a.active");

  /* START LOOP: for each active tag link */
  for (let tagWithActiveClass of allTagsWithActiveClass) {

    /* remove class active */
    tagWithActiveClass.classList.remove('active');

  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
   const allTagWithHrefAttribute = document.querySelectorAll('a[href^="'+ hrefAttrFromClickedEl +'"]')
 
  /* START LOOP: for each found tag link */
  for (let tagWithHrefAttribute of allTagWithHrefAttribute) {

    /* add class active */
    tagWithHrefAttribute.classList.add('active');

  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  
  // generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  /* find all links to tags */
  const allTagsElements = document.querySelectorAll(optArticleTagsSelector);
  /* START LOOP: for each link */
  for (let tagElement of allTagsElements) {

    /* add tagClickHandler as event listener for that link */
    tagElement.querySelector('a').addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();
