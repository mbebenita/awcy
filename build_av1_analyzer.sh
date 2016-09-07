#!/bin/bash

set -e

# git remote should be https://github.com/mbebenita/aomanalyzer.git
git fetch analyzer
git merge --no-commit -s recursive -X theirs analyzer/accounting-analyzer
make distclean

echo Building Analyzer
if [ ! -d "asm" ]; then
  echo Configuring Analyzer
  mkdir asm
  cd asm && emconfigure ../configure --disable-multithread --disable-runtime-cpu-detect --target=generic-gnu --enable-accounting
fi

cd asm
emmake make
cp examples/analyzer_decoder examples/analyzer_decoder.bc
emcc -O3 examples/analyzer_decoder.bc -o examples/decoder.js -s TOTAL_MEMORY=134217728 -s MODULARIZE=1 -s EXPORT_NAME="'DecoderModule'" --post-js "../ins/post.js" --memory-init-file 0
cd ..
mkdir -p ins/bin
cp asm/examples/decoder.js ins/bin/decoder.js
cp asm/examples/decoder.js.mem ins/bin/decoder.js.mem
