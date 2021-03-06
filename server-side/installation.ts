
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { NgComponentRelation, Page, Relation } from '@pepperi-addons/papi-sdk';
import MyService from './my.service';

export async function install(client: Client, request: Request): Promise<any> {
    // return await upsertPageBlockRelations(client);
    return installOrUpgradeOperation(client);
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return { success: true, resultObject: {} }
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    // return await upsertPageBlockRelations(client);
    return installOrUpgradeOperation(client);
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return { success: true, resultObject: {} }
}

async function upsertPageBlockRelations(client: Client) {
    const service = new MyService(client);
    const namePrefix: string = "PBBT";
    let pageRelations: NgComponentRelation[] = [
        {
            RelationName: "PageBlock",
            Name: "Page Block Tester",
            Description: "Page Block Tester",
            Type: "NgComponent",
            SubType: "NG12",
            AddonUUID: client.AddonUUID,
            AddonRelativeURL: "block_tester",
            ComponentName: "BlockTesterComponent",
            ModuleName: "BlockTesterModule",
            EditorComponentName: 'BlockTesterEditorComponent',
            EditorModuleName: 'BlockTesterEditorModule'
        }
    ]

    // pageComponentRelation.Key = `${pageComponentRelation.Name}_${pageComponentRelation.AddonUUID}_${pageComponentRelation.RelationName}`;
    for (let pageRelation of pageRelations) {
        await service.upsertRelation(pageRelation);
    }
    return { success: true };
}

async function createAdalScheme(client: Client){
    const service = new MyService(client);
    return await service.createFiltersSchema();
}

async function installOrUpgradeOperation(client: Client){
    await createAdalScheme(client);
    return await upsertPageBlockRelations(client);
}