#!/usr/bin/env bash
cd "`dirname "$0"`"
docObject="{"
for line in $(find ../../src/ -iname '*.jsx'); do
     mkdir -p `dirname ${line:10:-4}`
     docObject+='"'${line:10:-4}'": '`cat $line | npm run --silent doc`","
done
echo ${docObject::-1}"}" | ./buildDocs.sh

for line in $(find ../../src/ -iname '*.jsx'); do
    folder=`dirname ${line:10:-4}`
    rsync -a ${folder%%/*} ../../doc
    rm -r ${folder%%/*}
done;
