git clone git@github.com:codotype/codotype-web-next.git web-next
rm -rf ./web-next/pages/api_local
mv ./web-next/pages/api_prod ./web-next/pages/api
docker build -t codotype-plugin-prod .