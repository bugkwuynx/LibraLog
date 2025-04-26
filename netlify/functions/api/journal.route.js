const {
    getJournal,
    updateJournal
} = require("../../../server/controllers/journal.controller");

function createRes(resolve) {
    return {
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(data) {
            resolve({
                statusCode: this.statusCode || 200,
                body: JSON.stringify(data),
                headers: {"Content-Type": "application/json"},
            });
        }
    };
}

export const handler = async (event) => {
    const path = event.path.replace(/^\/\.netlify\/functions\/api/, "");
    const pathParts = path.split("/").filter(Boolean);
    const method = event.httpMethod;

    return new Promise(async (resolve) => {
        const res = createRes(resolve);
        
        // Build a mock req object
        const req = {
            query: event.queryStringParameters,
            params: {},
            body: event.body ? JSON.parse(event.body) : {},
        };

        try {
            // GET /:userName/:bookId
            if (method === 'GET' && pathParts.length === 2) {
                req.params.userName = pathParts[0];
                req.params.bookId = pathParts[1];
                return await getJournal(req, res);
            }

            // POST /:userName/:bookId
            if (method === 'POST' && pathParts.length === 2) {
                req.params.userName = pathParts[0];
                req.params.bookId = pathParts[1];
                return await updateJournal(req, res);
            }

            // Not matched
            return resolve({
                statusCode: 404,
                body: JSON.stringify({ error: "Not found" }),
            });
        }
        catch (error) {
            return resolve({
                statusCode: 500,
                body: JSON.stringify({error: error.message})
            });
        }
    });
}