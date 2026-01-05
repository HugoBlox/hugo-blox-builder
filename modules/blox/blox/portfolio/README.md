# Hugo Blox Portfolio Block

A responsive, filterable content grid component for displaying posts, projects, publications, or any Hugo content with advanced filtering and customization options.

## Key Features

- **Dynamic Filtering** - Interactive filter buttons by tags or categories with smooth transitions
- **Multiple Views** - article-grid, card, citation, list, compact, and custom layouts
- **Flexible Grid** - 1-4 column responsive layouts with mobile-first design
- **Smart Pagination** - Limit items shown per filter with auto-generated "View All" links
- **Content Filtering** - Filter by folders, tags, categories, authors, dates, publication types, and featured status
- **Customizable Visibility** - Hide/show authors, dates, tags, categories, read time, and images
- **Sorting Options** - Sort by date, title, or custom fields in ascending/descending order
- **Archive Integration** - Automatic links to taxonomy archive pages with item counts
- **Smooth Animations** - Fade and scale transitions when filtering items
- **Type-Safe** - Robust handling of tags/categories with backwards compatibility for old and new filter formats

## Configuration Options

### Content

- `page_type`
- `folders`
- `tags`
- `categories`
- `author`
- `featured_only`
- `count`
- `offset`
- `sort_by`
- `sort_ascending`

### Design

- `view`
- `columns`
- `filter_type`
- `filter_items`
- `filter_label`
- `max_posts_per_filter`
- `hide_author`
- `hide_tags`
- `hide_categories`
- `hide_date`
- `show_read_time`
- `fill_image`

### JavaScript

Client-side filtering with `portfolioFilter` object handling item visibility, button states, and "View All" link management without page reloads.

***

**Perfect for:** Academic portfolios, project showcases, blog post grids, publication libraries, and any content collection requiring elegant filtering and presentation.
