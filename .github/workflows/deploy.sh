#!/usr/bin/env bash
RED='\033[1;31m'
GREEN='\033[1;32m'
BLUE='\033[1;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

printf "📝 Deployment strategy:\n"
printf "=======================\n\n"
printf "${YELLOW}0. Infrastructure 🔧${NC}\n"
printf "${RED}1. Production 🚀${NC}\n"
printf "${RED}2. ACR Purge 🗑️${NC}\n\n"

read selection

if [ -n "$selection" ]; then

    if [ "$selection" = "0" ]
    then
    ############### INFRA ###############
    destination=infrastructure
    branch=main
    ############### INFRA ###############
    elif [ "$selection" = "1" ]
    then
    ############### PRODUCTION ###############
    destination=prod
    branch=main
    ############### PRODUCTION ###############
    elif [ "$selection" = "4" ]
    then
    ############### ACR PURGE ###############
    destination=""
    branch=""
    az acr run --cmd "acr purge --filter 'exips-prod-get-a-quote:.*' --ago 15d" --registry exipsproduction /dev/null
    ############### ACR PURGE ###############
    fi

    if [ -n "$destination" -a -n "$branch" ]
    then
    # Display latest push commit
    git checkout "${branch}"
    git pull
    printf "\n\n${NC}⬆️ ${branch} branch latest push : ${NC}"
    printf "${GREEN}"
    git log -n 1 --pretty | sort | grep commit
    printf "${NC}\n\n"

    # Deploy
    git checkout -b "${destination}"
    git push -f --set-upstream origin $destination

    # Clean up
    git checkout "${branch}"
    git branch -d $destination
    printf "\n\n✅ ${destination} deployment initiated, switched to ${branch}.\n\n"
    fi

else
    printf "${RED} ❌ Invalid input, terminating.${NC}\n\n";
    exit 0;
fi

#######################################
# UKEF deployment shell script v0.0.3
# 05/09/2022
# Abhi Markan
#######################################