#!/usr/bin/env bash

echo Subiendo a git los cambios de version

DIFF=$(git diff | grep package-lock.json)
if [ -z $DIFF ]; then
    echo ERROR: no se actualizo el package-lock de version
else
    git add .
    git commit -m "Update package-lock a nueva version"
    git push
    git push --tags
    echo Versiones actualizadas en repo remoto
fi
