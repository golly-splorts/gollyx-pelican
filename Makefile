MODULES=tests

CB := $(shell git branch --show-current)

all:
	@echo "no default make rule defined"

help:
	cat Makefile

lint:
	flake8 $(MODULES)

requirements:
	python3 -m pip install --upgrade -r requirements.txt

release_mainx:
	@echo "Releasing current branch $(CB) to mainx"
	scripts/release.sh $(CB) mainx

deploy_local:
	scripts/deploy_local.sh

deploy:
	scripts/deploy.sh
