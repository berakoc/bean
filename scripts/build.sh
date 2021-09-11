LIGHT_GREEN='\033[1;32m'
LIGHT_YELLOW='\033[1;33m'
LIGHT_PURPLE='\033[1;35m'
LIGHT_BLUE='\033[1;34m'
NC="\033[0m"

printf "${LIGHT_PURPLE}Build is about to start\n"
printf "${LIGHT_YELLOW}Formatting the code...\n"
npx prettier --check --write src/index.js
printf "${LIGHT_GREEN}Source code is formatted\n"
printf "${LIGHT_YELLOW}Adding formatted codes to git...\n"
git add -A
printf "${LIGHT_GREEN}Formatted codes are added to git\n"
printf "${LIGHT_YELLOW}Running tests...\n"
npm test
printf "${LIGHT_GREEN}Tests are passed successfully\n"
printf "${LIGHT_YELLOW}Clearing dist folder...\n"
rm -rf dist
printf "${LIGHT_GREEN}Dist folder is removed\n"
printf "${LIGHT_YELLOW}Bundling source code with NPM packages...\n"
node_modules/.bin/browserify src/index.js -o src/bundle.js
printf "${LIGHT_GREEN}Bundle is ready\n"
printf "${LIGHT_YELLOW}Transpiling the source code...\n"
npx babel src/bundle.js -o dist/index.js
printf "${LIGHT_YELLOW}Removing bundle...\n"
rm src/bundle.js
printf "${LIGHT_GREEN}Source code is transpiled\n"
printf "${LIGHT_YELLOW}Minifying the transpiled code\n"
uglifyjs dist/index.js -o dist/index.min.js --compress --mangle
printf "${LIGHT_GREEN}Minification is completed\n"
printf "${LIGHT_BLUE}Build is ready\n"