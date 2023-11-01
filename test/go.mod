module github.com/wowchemy/wowchemy-hugo-themes/test

go 1.15

require github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-tailwind main

replace github.com/wowchemy/wowchemy-hugo-themes/modules/wowchemy-tailwind => ../modules/wowchemy-tailwind
