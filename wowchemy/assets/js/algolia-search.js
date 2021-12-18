/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-themes
 *
 *  Algolia based search algorithm.
 **************************************************/

import {algoliaConfig, i18n, content_type} from '@params';
import algoliasearch from 'https://cdn.jsdelivr.net/npm/algoliasearch@4/dist/algoliasearch.esm.browser.js';
// import instantsearch from 'https://cdn.jsdelivr.net/npm/instantsearch.js@4/es/index.js'
// import {searchBox, infiniteHits} from 'https://cdn.jsdelivr.net/npm/instantsearch.js@4/es/widgets/index.js';

if (algoliaConfig.analytics) {
  let ALGOLIA_INSIGHTS_SRC = 'https://cdn.jsdelivr.net/npm/search-insights@2.0.2/dist/search-insights.iife.min.js';

  !(function (e, a, t, n, s, i, c) {
    (e.AlgoliaAnalyticsObject = s),
      (e[s] =
        e[s] ||
        function () {
          (e[s].queue = e[s].queue || []).push(arguments);
        }),
      (i = a.createElement(t)),
      (c = a.getElementsByTagName(t)[0]),
      (i.async = 1),
      (i.src = n),
      c.parentNode.insertBefore(i, c);
  })(window, document, 'script', ALGOLIA_INSIGHTS_SRC, 'aa');
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

// Get query from URI.
function getSearchQuery(name) {
  return decodeURIComponent((location.search.split(name + '=')[1] || '').split('&')[0]).replace(/\+/g, ' ');
}

// On page load, check for search query in URL.
document.addEventListener('DOMContentLoaded', () => {
  let queryURL = getSearchQuery('q');
  if (queryURL) {
    $('body').addClass('searching');
    $('.search-results').css({opacity: 0, visibility: 'visible'}).animate({opacity: 1}, 200);
    let commonQueries = document.querySelector('#search-common-queries');
    commonQueries.style.display = 'none';
  }

  if (typeof instantsearch === 'function' && $('#search-box').length) {
    const search = instantsearch({
      indexName: algoliaConfig.indexName,
      searchClient: algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey),
      searchParameters: {
        clickAnalytics: algoliaConfig.analytics,
        enablePersonalization: algoliaConfig.personalization,
      },
      searchFunction(helper) {
        if (helper.state.query) {
          helper.search();
        }
      },
      routing: {
        router: instantsearch.routers.history({
          parseURL() {
            return {
              q: getSearchQuery('q'),
            };
          },
        }),
        stateMapping: {
          stateToRoute(uiState) {
            const indexUiState = uiState[algoliaConfig.indexName];
            return {
              q: indexUiState.query,
            };
          },
          routeToState(routeState) {
            return {
              [algoliaConfig.indexName]: {
                query: routeState.q,
              },
            };
          },
        },
      },
    });

    let timerId = undefined;
    let searchResults = document.querySelector('#search-hits');
    let commonQueries = document.querySelector('#search-common-queries');

    // Initialize search box.
    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#search-box',
        autofocus: true,
        showReset: true,
        placeholder: i18n.placeholder,
        queryHook(query, refine) {
          if (query === '') {
            searchResults.style.display = 'none';
            commonQueries.style.display = 'block';
          } else {
            commonQueries.style.display = 'none';
            searchResults.style.display = 'block';
          }
          if (timerId) {
            clearTimeout(timerId);
          }
          timerId = setTimeout(() => refine(query), 300);
        },
      }),
    );

    // Initialize search results.
    search.addWidget(
      instantsearch.widgets.infiniteHits({
        container: '#search-hits',
        escapeHTML: true,
        templates: {
          empty: '<div class="search-no-results">' + i18n.no_results + '</div>',
          item: getTemplate('search-hit-algolia'),
        },
        cssClasses: {
          loadMore: 'btn btn-outline-primary',
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

    if (algoliaConfig.analytics) {
      const insightsMiddleware = instantsearch.middlewares.createInsightsMiddleware({
        insightsClient: window.aa,
        insightsInitParams: {
          useCookie: true,
        },
      });

      search.use(insightsMiddleware);
    }

    // Start search.
    search.start();
  }
});
