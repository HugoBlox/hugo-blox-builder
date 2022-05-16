#!/usr/bin/env zsh

cd "starters/$1"
hugo mod get -u ./...
cd ../..
