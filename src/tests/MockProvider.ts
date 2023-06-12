import { readFile as _readFile } from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(_readFile);
import type { APIProvider, APIResponse } from '@wharfkit/session';
import {json} from "@sveltejs/kit";

const __dirname = path.resolve(path.dirname(''));

export interface MockInterface {
    url: string;
    method: 'POST' | 'GET';
    request: {
        contentType: string;
        payload: any;
    };
    response: {
        code: number;
        body: string | any;
        location: string | null;
    };
}

/*
 * helper function to keep service code clean
 * allows one line implementation of mock inside API call
 * default error message returned when file can not be loaded
 */
export async function mockResponse(filename: string) {
    const mocker = new MockProvider();
    const sendDataMock = await mocker.load(filename);
    return json(
        sendDataMock?.response.body || { message: 'error: no mock response found' },
        { status: sendDataMock?.response.code || 550 },
    );
}

/*
 * class to handel loading of mocks
 */
export class MockProvider implements APIProvider {
    async load(filename: string): Promise<MockInterface | undefined> {
        const fullPath = __dirname + '/src/tests';
        const filePath = path.join(fullPath, filename);
        return await this.getMockData(filePath);
    }

    // keeping this hook if an account balance path is needed
    private mapFilename(path: string) {
        if (path === '/get_rows') return 'mock-data-get-rows.json';
        // if (path === '/account') return 'undefined.json'
        return 'mock-data-get-rows.json';
    }

    private convertToAPIResponse(data: MockInterface): APIResponse {
        if (!data) {
            throw 'Unable to establish mock api';
        }
        const text: string = data?.response.body.toString() || 'empty';
        return {
            json: data!.response.body,
            text: text,
            status: data?.response.code || 0,
            headers: {},
        } as APIResponse;
    }

    async call(path: string, params?: unknown) {
        const filename = this.mapFilename(path);
        const existing: MockInterface = await this.load(filename).then((result): MockInterface => {
            // defined result with real values
            if (result) return result as MockInterface;
            // return an empty MockInterface, undefined isn't valid for APIResponse
            return {
                url: '',
                method: 'GET',
                request: { contentType: '', payload: '' },
                response: { code: 0, body: '', location: null },
            } as MockInterface;
        });
        return this.convertToAPIResponse(existing);
    }

    private async getMockData(filePath: string) {
        try {
            const data = await readFile(filePath);
            const dataObject = JSON.parse(data.toString('utf8'));
            const mockObject: MockInterface = {
                url: dataObject.url,
                method: dataObject.method,
                request: {
                    contentType: dataObject.request.contentType,
                    payload: dataObject.request.payload || '',
                },
                response: {
                    code: dataObject.response.code,
                    body: dataObject.response.body || '',
                    location: dataObject.response.location || null,
                },
            };
            return mockObject;
        } catch (error) {
            if ((<any>error).code !== 'ENOENT') {
                throw error;
            }
        }
    }
}
