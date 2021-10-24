module github.com/ddiLab/wowchemy-hugo-themes/v5

go 1.15

replace github.com/ddiLab/wowchemy-hugo-themes/wowchemy/v5 => ./wowchemy
replace github.com/ddiLab/wowchemy-hugo-themes/wowchemy-cms/v5 => ./wowchemy-cms
require github.com/ddiLab/wowchemy-hugo-themes/wowchemy/v5 v5.0.0-20210629192904-559885af86b7
require github.com/ddiLab/wowchemy-hugo-themes/wowchemy-cms/v5 v5.0.0-20210629192904-559885af86b7
