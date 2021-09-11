#!/bin/sh


export AWS_ACCESS_KEY_ID="***********" 
export AWS_SECRET_ACCESS_KEY="************"
export ENDPOINT="https://s3.********.com"
export BUCKET="bucket"

aws s3 cp s3clihelper.html s3://${BUCKET}/s3clihelper/s3clihelper.html --endpoint-url=$ENDPOINT
aws s3 cp config.js s3://${BUCKET}/s3clihelper/config.js  --endpoint-url=$ENDPOINT
aws s3 sync css s3://${BUCKET}/s3clihelper/css/  --endpoint-url=$ENDPOINT
aws s3 sync js s3://${BUCKET}/s3clihelper/js/  --endpoint-url=$ENDPOINT

aws s3 cp *.zip s3://${BUCKET}/s3clihelper/  --endpoint-url=$ENDPOINT


