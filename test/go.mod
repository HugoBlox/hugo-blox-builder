module github.com/wowchemy/wowchemy-hugo-modules/test

go 1.15

require (
	github.com/wowchemy/wowchemy-hugo-modules/wowchemy main
	github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms main
)

replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy => ../wowchemy
replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms => ../wowchemy-cms
