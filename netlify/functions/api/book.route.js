const {
    searchBook,
    addBook,
    getBooks,
    deleteBook,
    updateBook,
} = require('../../../server/controllers/book.controller');

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
            // GET /search?q=...
            if (method === 'GET' && pathParts[0] === 'search') {
                return await searchBook(req, res);
            }

            // POST /add/:username
            if (method === 'POST' && pathParts[0] === 'add') {
                req.params.username = pathParts[1];
                return await addBook(req, res);
            }

            // GET /:username
            if (method === 'GET' && pathParts.length === 1) {
                req.params.username = pathParts[0];
                return await getBooks(req, res);
            }

            // DELETE /:username/:id
            if (method === "DELETE" && pathParts.length === 2) {
                req.params.username = pathParts[0];
                req.params.id = pathParts[1];
                return await deleteBook(req, res);
            }

            // PUT /:username/:id
            if (method === "PUT" && pathParts.length === 2) {
                req.params.username = pathParts[0];
                req.params.id = pathParts[1];
                return await updateBook(req, res);
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