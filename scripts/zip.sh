#!/usr/bin/env bash
echo Zipeando

VERSION=$(npm run version --silent)
NAME=$(npm run name --silent)

ZIP=$NAME-$VERSION.zip

echo Archivo: $ZIP

if [ -d "build" ]; then
    zip -r $ZIP build
    echo Zipeado con exito $ZIP
else
    echo ERROR: no existe directorio build
    return 1
fi

