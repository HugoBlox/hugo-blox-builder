module github.com/wowchemy/wowchemy-hugo-modules/v5

go 1.15

require github.com/gcushen/wowchemy-hugo-modules/wowchemy/v5 latest
replace github.com/gcushen/wowchemy-hugo-modules/wowchemy/v5 => ./wowchemy

require github.com/gcushen/wowchemy-hugo-modules/wowchemy-cms/v5 latest
replace github.com/gcushen/wowchemy-hugo-modules/wowchemy-cms/v5 => ./wowchemy-cms
