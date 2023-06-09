import fs from 'fs';
import path from 'path';

export interface MockInterface {
    url: string;
    method: 'POST' | 'GET';
    request: {
        contentType: string;
        payload: never;
    };
    response: {
        code: number;
        body: string | never;
        location: string | null;
    };
}
export interface MockData {
    [key: string]: MockInterface;
}
export class Mocks {
    public data: MockData;

    constructor() {
        const mockDataFiles = [
            'mock-data-get-rows.json',
            'mock-data-ratelimit.json',
            'mock-data-send.json',
            'mock-data-send-307.json'
        ];
        this.data = this.load(mockDataFiles);
    }

    load(mockDataFiles: string[]): MockData {
        let mockData: MockData = {};
        mockDataFiles.forEach((filename) => {
            const filePath = path.join(__dirname, filename);
            // chop off file extension
            // default key to 'unknown' if split fails to produce array with a value
            const key = filename.split('.').shift() || 'unknown';
            fs.readFile(filePath, 'utf-8', (err,data) => {
                if (err) {
                    console.error(`Error Reading Mock Data File ${filePath}`);
                } else {
                    mockData[key] = this.parseMockData(data)
                        .then((result: MockInterface) => result)
                        .catch((e) => console.log(`Unable to parse mock data file ${e.message()}`));
                }
            });
        });
        return mockData;
    }

    private async parseMockData(data: string): Promise<MockInterface> {
        return (await JSON.parse(data)) as MockInterface;
    }
}