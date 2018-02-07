#!/usr/bin/env bash

echo Subiendo a git los cambios de version

GIT_URL=$(npm run git-connection --silent)
echo PUSH: $GIT_URL

git push $GIT_URL
RET=$?
if [ 0 != $RET ]; then
    echo ERROR: No se pudo puehear. Error code: $RET
    exit 1
fi

git push --tags $GIT_URL
RET=$?
if [ 0 != $RET ]; then
    echo ERROR: No se pudo puehear. Error code: $RET
    exit 1
fi

echo Versiones actualizadas en repo remoto

