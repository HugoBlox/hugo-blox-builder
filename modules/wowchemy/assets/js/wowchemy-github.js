import {hugoEnvironment} from '@params';

/* ---------------------------------------------------------------------------
 * GitHub API.
 * --------------------------------------------------------------------------- */

function printLatestRelease(selector, repo) {
  if (hugoEnvironment === 'production') {
    $.getJSON('https://api.github.com/repos/' + repo + '/tags')
      .done(function (json) {
        let release = json[0];
        $(selector).append(' ' + release.name);
      })
      .fail(function (jqxhr, textStatus, error) {
        let err = textStatus + ', ' + error;
        console.log('Request Failed: ' + err);
      });
  }
}

export {printLatestRelease};
