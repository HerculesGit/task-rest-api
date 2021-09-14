# postgres
npm install --save pg pg-hstore # Postgres


# run dev server = remender that should to be create the start script on package.json 
yarn dev 

# create database on postgres
npx sequelize db:create

# grop database
npx sequelize db:drop

# or
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string


# migrate/create tables
sequelize db:migrate

