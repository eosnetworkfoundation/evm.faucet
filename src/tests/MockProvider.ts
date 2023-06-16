import type { APIProvider, APIResponse } from '@wharfkit/session';
import { json } from '@sveltejs/kit';

import * as mock_data_get_rows from './mock-data-get-rows.json';
import * as mock_data_send from './mock-data-send.json';
import * as mock_data_ratelimit from './mock-data-ratelimit.json';
import * as mock_data_send_307 from './mock-data-send-307.json';

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
    return json(sendDataMock?.response.body || { message: 'error: no mock response found' }, {
        status: sendDataMock?.response.code || 550,
    });
}

/*
 * class to handel loading of mocks
 */
export class MockProvider implements APIProvider {
    async load(filename: string): Promise<MockInterface | undefined> {
        console.log(`processing ${filename}`);
        return await this.getMockData(this.pathToJson(filename));
    }

    // maps path to the mock data we imported as json files
    private pathToJson(path: string) {
        let mockData;
        switch (path) {
        case '/get_rows': {
                mockData = mock_data_get_rows;
            break;
        }
            case '/v1/chain/get_table_rows': {
                mockData = mock_data_get_rows;
                break;
            }
        case 'mock-data-get-rows.json': {
            mockData = mock_data_get_rows;
            break;
        }
        case 'mock-data-send.json': {
            mockData = mock_data_send;
            break;
        }
        case 'mock-data-send-307.json': {
            mockData = mock_data_send_307;
            break;
        }
        case 'mock-data-ratelimit.json': {
            mockData = mock_data_ratelimit;
            break;
        }
        default: {
            mockData = JSON.parse(`{"contentType": "application/json", "request": {"payload":"${path}"}, "response": {"code":"500", "body":"Error ${path} did not map to anything in MockProvider.pathToJson()"}}`);
            break;
        }
        }
        return mockData;
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
        const existing: MockInterface = await this.load(path).then((result): MockInterface => {
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

    private async getMockData(dataObject: any) {
        try {
            const mockObject: MockInterface = {
                url: dataObject.url,
                method: dataObject.method,
                request: {
                    contentType: dataObject.request.contentType,
                    payload: dataObject.request.payload,
                },
                response: {
                    code: dataObject.response.code,
                    body: dataObject.response.body,
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
