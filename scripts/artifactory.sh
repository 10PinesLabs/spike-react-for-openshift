#!/usr/bin/env bash
echo Subiendo al artifactory

VERSION=$(npm run version --silent)
NAME=$(npm run name --silent)

ZIP=$NAME-$VERSION.zip
echo "Se subira artefacto -> " $ZIP

if [ -f $ZIP ]; then
    curl -vX PUT "http://madariaga1.claro.amx:8081/artifactory/libs-release-local/wapp-spike-frontend/"$ZIP -T $ZIP
    CURL_RET=$?
    if [ 0 != $CURL_RET ]; then
        echo ERROR: no se pudo subir el artefacto. Return code $CURL_RET
        return 1
    else
        echo artefacto subido
    fi
else
    echo ERROR: no existe el zip
    return 1
fi