cd server
npm install
npm audit fix --force
node ./db/populate_script.js

cd ../client
npm install
npm audit fix --force
npm run build
