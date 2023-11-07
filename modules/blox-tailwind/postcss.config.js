let tailwindConfig = process.env.HUGO_FILE_TAILWIND_CONFIG_JS || './tailwind.config.js';

module.exports = {
	plugins: {
    'postcss-import': {},
    tailwindcss: {config: tailwindConfig},
    autoprefixer: {},
  }
};
