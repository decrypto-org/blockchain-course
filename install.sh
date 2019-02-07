git submodule init && git submodule update
cd db && yarn install && yarn link
./node_modules/.bin/run.env ./node_modules/.bin/sequelize db:migrate
cd ../cli && yarn install && yarn link blockchain-course-db
cd ../api && yarn install && yarn link blockchain-course-db
cd ../app && yarn install
