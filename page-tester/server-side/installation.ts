import { blockDetailsList, produceConsumeForLoop } from './../blocks-helper';
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { Relation } from '@pepperi-addons/papi-sdk'
import MyService from './my.service';

export async function install(client: Client, request: Request): Promise<any> {
    // For page block template uncomment this.
    // const res = await createPageBlockRelation(client);
    // return res;
    return await createPageBlockRelation(client);
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    return await createPageBlockRelation(client);
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}


async function createPageBlockRelation(client: Client): Promise<any> {
    try {
        // TODO: change to block name (this is the unique relation name and the description that will be on the page builder editor in Blocks section).
        const blockName = 'Page Tester';

        // TODO: Change to fileName that declared in webpack.config.js
        const filename = 'page_tester';
        
        const pageComponentRelation: Relation = {
            RelationName: "PageBlock",
            Name: produceConsumeForLoop.blockName,
            Description: produceConsumeForLoop.blockName,
            Type: "NgComponent",
            SubType: "NG12",
            AddonUUID: client.AddonUUID,
            AddonRelativeURL: produceConsumeForLoop.fileName,
            ComponentName: produceConsumeForLoop.componentName, // This is should be the block component name (from the client-side)
            ModuleName: produceConsumeForLoop.moduleName, // This is should be the block module name (from the client-side)
            EditorComponentName: produceConsumeForLoop.editorComponentName, // This is should be the block editor component name (from the client-side)
            EditorModuleName: produceConsumeForLoop.editorModuleName // This is should be the block editor module name (from the client-side)
        };

        const blockRelations: Relation[] = blockDetailsList.map((blockRelation) => {
            return {
                RelationName: "PageBlock",
                Name: blockRelation.blockName,
                Description: blockRelation.blockName,
                Type: "NgComponent",
                SubType: "NG12",
                AddonUUID: client.AddonUUID,
                AddonRelativeURL: blockRelation.fileName,
                ComponentName: blockRelation.componentName, // This is should be the block component name (from the client-side)
                ModuleName: blockRelation.moduleName, // This is should be the block module name (from the client-side)
                EditorComponentName: blockRelation.editorComponentName, // This is should be the block editor component name (from the client-side)
                EditorModuleName: blockRelation.editorModuleName // This is should be the block editor module name (from the client-side)
            };
        });
        const service = new MyService(client);
        const resultsArray : any[] = []
        for(let blockRelation of blockRelations){
            const result = await service.upsertRelation(blockRelation);
            resultsArray.push(result);
        }
        // const result = await service.upsertRelation(pageComponentRelation);
        return { success:true, resultObject: JSON.stringify(resultsArray) };
    } catch(err) {
        return { success: false, resultObject: err , errorMessage: `Error in upsert relation. error - ${err}`};
    }
}