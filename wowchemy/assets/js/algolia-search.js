/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-modules
 *
 *  Algolia based search algorithm.
 **************************************************/

import {algoliaConfig, i18n, content_type} from '@params';

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

if (typeof instantsearch === 'function' && $('#search-box').length) {
  const options = {
    appId: algoliaConfig.appId,
    apiKey: algoliaConfig.apiKey,
    indexName: algoliaConfig.indexName,
    routing: true,
    searchParameters: {
      hitsPerPage: 10,
    },
    searchFunction: function (helper) {
      let searchResults = document.querySelector('#search-hits');
      if (helper.state.query === '') {
        searchResults.style.display = 'none';
        return;
      }
      helper.search();
      searchResults.style.display = 'block';
    },
  };

  const search = instantsearch(options);

  // Initialize search box.
  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-box',
      autofocus: false,
      reset: true,
      poweredBy: algoliaConfig.poweredBy,
      placeholder: i18n.placeholder,
    }),
  );

  // Initialize search results.
  search.addWidget(
    instantsearch.widgets.infiniteHits({
      container: '#search-hits',
      escapeHits: true,
      templates: {
        empty: '<div class="search-no-results">' + i18n.no_results + '</div>',
        item: getTemplate('search-hit-algolia'),
      },
      cssClasses: {
        showmoreButton: 'btn btn-outline-primary',
      },
    }),
  );

  // On render search results, localize the content type metadata.
  search.on('render', function () {
    $('.search-hit-type').each(function () {
      let content_key = $(this).text();
      if (content_key in content_type) {
        $(this).text(content_type[content_key]);
      }
    });
  });

  // Start search.
  search.start();
}
