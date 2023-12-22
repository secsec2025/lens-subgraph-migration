import {eth} from 'web3';

export const extractContentURIFromPostCreatedLog = (data: string, topics: string[]): string => {
    const inputs = [
        {
            "type": "uint256",
            "name": "profileId",
            "indexed": true
        },
        {
            "type": "uint256",
            "name": "pubId",
            "indexed": true
        },
        {
            "type": "string",
            "name": "contentURI",
            "indexed": false
        },
        {
            "type": "address",
            "name": "collectModule",
            "indexed": false
        },
        {
            "type": "bytes",
            "name": "collectModuleReturnData",
            "indexed": false
        },
        {
            "type": "address",
            "name": "referenceModule",
            "indexed": false
        },
        {
            "type": "bytes",
            "name": "referenceModuleReturnData",
            "indexed": false
        },
        {
            "type": "uint256",
            "name": "timestamp",
            "indexed": false
        }
    ];
    const res = eth.abi.decodeLog(inputs, data, topics);
    return res[2] as string;
}

export const extractContentURIFromCommentCreatedLog = (data: string, topics: string[]): string => {
    const inputs = [
        {
            "type": "uint256",
            "name": "profileId",
            "indexed": true
        },
        {
            "type": "uint256",
            "name": "pubId",
            "indexed": true
        },
        {
            "type": "string",
            "name": "contentURI",
            "indexed": false
        },
        {
            "type": "uint256",
            "name": "profileIdPointed",
            "indexed": false
        },
        {
            "type": "uint256",
            "name": "pubIdPointed",
            "indexed": false
        },
        {
            "type": "bytes",
            "name": "referenceModuleData",
            "indexed": false
        },
        {
            "type": "address",
            "name": "collectModule",
            "indexed": false
        },
        {
            "type": "bytes",
            "name": "collectModuleReturnData",
            "indexed": false
        },
        {
            "type": "address",
            "name": "referenceModule",
            "indexed": false
        },
        {
            "type": "bytes",
            "name": "referenceModuleReturnData",
            "indexed": false
        },
        {
            "type": "uint256",
            "name": "timestamp",
            "indexed": false
        }
    ];
    const res = eth.abi.decodeLog(inputs, data, topics);
    return res[2] as string;
}
