module github.com/wowchemy/wowchemy-hugo-modules/test

go 1.15

replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5 => ../wowchemy
replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms/v5 => ../wowchemy-cms

require (
	github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms/v5 v5.3.0
	github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5 v5.3.0
)
