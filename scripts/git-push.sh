#!/usr/bin/env bash

echo Subiendo a git los cambios de version

git push
RET=$?
if [ 0 != $RET ]; then
    echo ERROR: No se pudo puehear. Error code: $RET
    return 1
fi

git push --tags
RET=$?
if [ 0 != $RET ]; then
    echo ERROR: No se pudo puehear. Error code: $RET
    return 1
fi

echo Versiones actualizadas en repo remoto

