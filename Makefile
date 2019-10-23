install:
	cd client && yarn
	cd server && yarn

start-client:
	cd client && yarn start

start-server:
	cd server && yarn start

build-client:
	cd client && yarn build

deploy-client:
	$(MAKE) build-client
	cd client && aws s3 sync ./build s3://poll-realtime-graphql

deploy-server:
	zip -r server.zip server/* --exclude '*node_modules*'
	scp server.zip $(SSH):~/server.zip
	ssh $(SSH) ' \
		unzip -uo ~/server.zip; \
		rm -f server.zip; \
		cd ~/server; \
		yarn; \
		pm2 reload ecosystem.config.js \
	'
	rm -f server.zip
