SHELL := /bin/bash
# Defines rules to generate [filename].pdf, and [filename].tex
# Output files are generated by inputting [filename].md (markdown)
# into pandoc

# SASS
sass:
	rm -rf public/sass
	bunx sass src/scss:public/style --watch --color

# DOCUMENTATION:
%.beamer.pdf: %.md
	pandoc -t beamer -F mermaid-filter "$<" -o "$@"
	rm mermaid-filter.err

%.pdf: %.md
	pandoc -F mermaid-filter "$<" -o "$@"
	rm mermaid-filter.err

%.tex: %.md
	pandoc -F mermaid-filter "$<" -o "$@"
	rm mermaid-filter.err

pdf: $(shell \
	find -name "*.md" -print0 \
	| xargs -0 ls -b \
	| sed -e 's/.md/.pdf/' \
	| tr '\n' ' ' \
)

tex: $(shell \
	find -name "*.md" -print0 \
	| xargs -0 ls -b \
	| sed -e 's/.md/.tex/' \
	| tr '\n' ' ' \
)

a3: docs/assignments/3\ -\ Feasability/feasability.pdf