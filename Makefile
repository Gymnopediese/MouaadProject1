all:
	docker-compose up --build --force-recreate

front:
	npm --prefix ./frontend run dev

back:
	npm --prefix ./backend run start:dev
	
new:
	npm i -g @nestjs/cli

niupbuild:
	npm --prefix ./frontnew install
	npm --prefix ./backend install
	docker-compose -f docker-compose.yml up --build --force-recreate

upbuild:
	docker-compose -f docker-compose.dev.yml up --build --force-recreate
	
dupbuild:
	docker-compose -f docker-compose.dev.yml up --build -d

down:
	docker-compose -f docker-compose.dev.yml down

prod:
	docker-compose -f docker-compose.prod.yml up

.PHONY: front back new upbuild down
