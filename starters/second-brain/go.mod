module github.com/wowchemy/hugo-second-brain-theme

go 1.15

replace (
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy/v5 => ../../modules/wowchemy
)

require (
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-netlify v1.0.0 // indirect
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-plugin-netlify-cms v1.0.0 // indirect
	github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy/v5 v5.7.0 // indirect
)
