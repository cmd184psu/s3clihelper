#!/bin/sh


#hs-s3curl.pl --id 39045bbb2749958d1599 --key 2h1IasEIijsKJwQNeEGMkfmwZWJvXo9iedhWx2bo --put ./s3clihelper.html  --contentType "text/html" --  https://s3.cloudianhyperstore.com/downloads.cloudian.com/s3clihelper/s3clihelper.html
#hs-s3curl.pl --id 39045bbb2749958d1599 --key 2h1IasEIijsKJwQNeEGMkfmwZWJvXo9iedhWx2bo  -- -I  https://s3.cloudianhyperstore.com/downloads.cloudian.com/s3clihelper/s3clihelper.html
#hs-s3curl.pl --id 39045bbb2749958d1599 --key 2h1IasEIijsKJwQNeEGMkfmwZWJvXo9iedhWx2bo --head  -- https://s3.cloudianhyperstore.com/downloads.cloudian.com/s3clihelper/s3clihelper.html

export AWS_ACCESS_KEY_ID="39045bbb2749958d1599" 
export AWS_SECRET_ACCESS_KEY="2h1IasEIijsKJwQNeEGMkfmwZWJvXo9iedhWx2bo"
export ENDPOINT="https://s3.cloudianhyperstore.com"
export BUCKET="downloads.cloudian.com"
#s3cmd --access_key=$AWS_ACCESS_KEY_ID --secret_key=$AWS_SECRET_ACCESS_KEY put s3clihelper.html s3://downloads.cloudian.com/s3clihelper/s3clihelper.html --host=s3.cloudianhyperstore.com --ssl 

aws s3 cp s3clihelper.html s3://${BUCKET}/s3clihelper/s3clihelper.html --endpoint-url=$ENDPOINT
aws s3 cp config.js s3://${BUCKET}/s3clihelper/config.js  --endpoint-url=$ENDPOINT
aws s3 sync css s3://${BUCKET}/s3clihelper/css/  --endpoint-url=$ENDPOINT
aws s3 sync js s3://${BUCKET}/s3clihelper/js/  --endpoint-url=$ENDPOINT

aws s3 cp *.zip s3://${BUCKET}/s3clihelper/  --endpoint-url=$ENDPOINT


