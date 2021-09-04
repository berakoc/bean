LIGHT_PURPLE='\033[1;35m'
NC="\033[0m"

printf "${LIGHT_PURPLE}Build is about to start"
echo "Clearing dist folder..."
rm -rf dist
echo "Dist folder is removed"
echo "Transpiling the source code..."
npx babel src/index.js -o dist/index.js
echo "Source code is transpiled"
echo "Minifying the transpiled code"
uglifyjs dist/index.js -o dist/index.min.js --compress --mangle --source-map url=index.min.js.map
echo "Minification is over"
echo "Build is ready"