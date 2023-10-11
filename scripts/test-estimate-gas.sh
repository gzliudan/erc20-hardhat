#!/bin/bash

DIR=$( cd $(dirname $0); pwd )
FILE="${DIR}/../deploy/dev.json"

PROXY=$( cat ${FILE} | jq -r ".test_token_v1.proxy" )
CONTRACT_V1=$( cat ${FILE} | jq -r ".test_token_v1.implementation" )
CONTRACT_V2=$( cat ${FILE} | jq -r ".test_token_v1.implementation" )

for ADDRESS in ${PROXY} ${CONTRACT_V1} ${CONTRACT_V1} ; do
  curl -s -X POST ${DEV_RPC_URL} -H "Content-Type: application/json" -d '
  {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_estimateGas",
    "params": [
      {
        "data": "0x06fdde03",
        "to": "'"${ADDRESS}"'"
      },
      "pending"
    ]
  }' | jq

  curl -s -X POST ${DEV_RPC_URL} -H "Content-Type: application/json" -d '
  {
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_estimateGas",
    "params": [
      {
        "data": "0x06fdde03",
        "to": "'"${ADDRESS}"'"
      }
    ]
  }' | jq
done
