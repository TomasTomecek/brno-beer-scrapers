#!/bin/bash
source ./secret.txt

node_modules=("fb" "cheerio" "request")

# test if required modules are present, if not, install them
for m in ${node_modules[@]} ; do
    if [[ ! -e ./node_modules/${m} ]] ; then
        npm install ${m}
    fi
done

# exec all scripts except common stuff
for f in $(find . -type f \( -name "*.js" ! -name "web.js" ! -name "fb.js" \)) ; do
    node ${f} >sync_$(date +"%m%d_%H%M").log
done
