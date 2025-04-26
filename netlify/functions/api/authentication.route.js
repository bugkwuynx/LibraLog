const {
    register,
    login,
    logout
} = require('../../../server/controllers/authentication.controller');

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
                headers: {'Content-Type': 'application/json'}
            });
        }
    };
}

export const handler = async (event) => {
    const path = event.path.replace(/^\/\.netlify\/functions\/api/, "");
    const pathParts = path.split("/").filter(Boolean);
    const method = event.httpMethod;

    return new Promise(async (resolve) => {
        const req = {
            query: event.queryStringParameters,
            params: {},
            body: event.body ? JSON.parse(event.body) : {},
        };

        try {
            // POST /register
            if (method === 'POST' && pathParts[0] === 'register') {
                return await register(req, createRes(resolve));
            }

            // POST /login
            if (method === 'POST' && pathParts[0] === 'login') {
                return await login(req, createRes(resolve));
            }

            // POST /logout
            if (method === 'POST' && pathParts[0] === 'logout') {
                return await logout(req, createRes(resolve));
            }

            return resolve({
                statusCode: 404,
                body: JSON.stringify({error: 'Not Found'})
            });
        }
        catch (error) {
            return resolve({
                statusCode: 500,
                body: JSON.stringify({error: error.message})
            });
        }
    });
};