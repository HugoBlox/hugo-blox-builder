/**
 * Hero Block Component - Single source of truth
 * Used for both SSR and client-side hydration
 */

import {Icon} from "../../shared/components/Icon.jsx";

// Simple markdown renderer
export function renderText(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>");
}

// Process URLs
export function processUrl(url) {
  if (!url) return {href: "#"};

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return {
      href: url,
      target: "_blank",
      rel: "noopener",
    };
  }

  if (url.startsWith("#")) {
    return {href: url};
  }

  return {href: url};
}

// Hero Block Component - Single implementation
export const HeroBlock = ({content, design, id, icon_svg}) => {
  const paddingClasses = design?.no_padding ? "" : "py-32 sm:py-48 lg:py-56";

  return (
    <div class="relative isolate px-6 pt-14 lg:px-8" id={id}>
      <div class={`mx-auto max-w-2xl ${paddingClasses}`}>
        {/* Announcement Banner */}
        {content.announcement?.text && (
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-300 hover:ring-gray-900/20 dark:hover:ring-gray-400">
              {/* eslint-disable-next-line lint/security/noDangerouslySetInnerHtml */}
              <span
                dangerouslySetInnerHTML={{
                  __html: renderText(content.announcement.text),
                }}
              />
              {content.announcement.link?.text && (
                <a
                  href={processUrl(content.announcement.link.url).href}
                  {...(processUrl(content.announcement.link.url).target && {
                    target: processUrl(content.announcement.link.url).target,
                    rel: processUrl(content.announcement.link.url).rel,
                  })}
                  class="pl-2 font-semibold text-primary-600 dark:text-primary-300"
                >
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  {content.announcement.link.text} <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div class="text-center">
          {/* Title */}
          {content.title && (
            <h1
              class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl"
              dangerouslySetInnerHTML={{__html: renderText(content.title)}}
            />
          )}

          {/* Subtitle/Text */}
          {content.text && (
            <p
              class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              dangerouslySetInnerHTML={{__html: renderText(content.text)}}
            />
          )}

          {/* Action Buttons */}
          {(content.primary_action?.url || content.secondary_action?.url) && (
            <div class="mt-10 flex items-center justify-center gap-x-6">
              {/* Primary CTA */}
              {content.primary_action?.url && (
                <a
                  href={processUrl(content.primary_action.url).href}
                  {...(processUrl(content.primary_action.url).target && {
                    target: processUrl(content.primary_action.url).target,
                    rel: processUrl(content.primary_action.url).rel,
                  })}
                  class="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderText(content.primary_action.text),
                    }}
                  />
                  {content.primary_action.icon && (
                    <span class="inline-block pl-2">
                      <Icon svg={icon_svg} />
                    </span>
                  )}
                </a>
              )}

              {/* Secondary CTA */}
              {content.secondary_action?.url && (
                <a
                  href={processUrl(content.secondary_action.url).href}
                  {...(processUrl(content.secondary_action.url).target && {
                    target: processUrl(content.secondary_action.url).target,
                    rel: processUrl(content.secondary_action.url).rel,
                  })}
                  class="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:dark:text-gray-200 hover:text-gray-800"
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderText(content.secondary_action.text),
                    }}
                  />
                  <span aria-hidden="true"> →</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
