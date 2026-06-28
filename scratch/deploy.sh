#!/bin/bash
ORG=paolomoz
REPO=stardust-multitest-280626-noak
BRANCH=site-xfinity
ROOT=/Users/paolo/stardust/rollout/multitest-280626-noak/runs/xfinity
CURL=/usr/bin/curl
TOKEN=$(grep -E '^DA_TOKEN=' "$ROOT/.env" | cut -d= -f2- | tr -d '"' | tr -d "'" | tr -d ' ')
cd "$ROOT" || exit 1

deploy_one(){
  local file="$1"
  local path="${file#content/}"
  path="${path%.html}"
  local put prev live
  put=$($CURL -s -o /dev/null -w "%{http_code}" -X PUT \
    -H "Authorization: Bearer $TOKEN" \
    -F "data=@${file};type=text/html" \
    "https://admin.da.live/source/$ORG/$REPO/${path}.html")
  prev=$($CURL -s -o /dev/null -w "%{http_code}" -X POST \
    -H "Authorization: Bearer $TOKEN" \
    "https://admin.hlx.page/preview/$ORG/$REPO/$BRANCH/${path}")
  live=$($CURL -s -o /dev/null -w "%{http_code}" -X POST \
    -H "Authorization: Bearer $TOKEN" \
    "https://admin.hlx.page/live/$ORG/$REPO/$BRANCH/${path}")
  echo "PUT=$put PREVIEW=$prev LIVE=$live  /${path}"
}

for f in "$@"; do deploy_one "$f"; done
