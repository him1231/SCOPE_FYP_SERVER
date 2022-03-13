"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var agency_controller_1 = require("./controller/agency.controller");
var calendar_controller_1 = require("./controller/calendar.controller");
var calendarDate_controller_1 = require("./controller/calendarDate.controller");
var fare_controller_1 = require("./controller/fare.controller");
var node_controller_1 = require("./controller/node.controller");
var product_controller_1 = require("./controller/product.controller");
var route_controller_1 = require("./controller/route.controller");
var routeStop_controller_1 = require("./controller/routeStop.controller");
var session_controller_1 = require("./controller/session.controller");
var stop_controller_1 = require("./controller/stop.controller");
var user_controller_1 = require("./controller/user.controller");
var requireUser_1 = __importDefault(require("./middleware/requireUser"));
var validateResource_1 = __importDefault(require("./middleware/validateResource"));
var product_schema_1 = require("./schema/product.schema");
var session_schema_1 = require("./schema/session.schema");
var user_schema_1 = require("./schema/user.schema");
function routes(app) {
    app.get('/updateAgencies', agency_controller_1.updateAgenciesHandler);
    app.get('/updateCalendars', calendar_controller_1.updateCalendarsHandler);
    app.get('/updateCalendarDates', calendarDate_controller_1.updateCalendarDatesHandler);
    app.get('/updateRoutes', route_controller_1.updateRoutesHandler);
    app.get('/updateStops', stop_controller_1.updateStopsHandler);
    app.get('/updateFares', fare_controller_1.updateFaresHandler);
    app.get('/updateRouteStops', routeStop_controller_1.updateRouteStopsHandler);
    app.get('/updateNodes', node_controller_1.updateNodesHandler);
    app.get('/getNodes', node_controller_1.getNodesHandler);
    app.get('/getStops', stop_controller_1.getStopsHandler);
    app.get('/getRoutes', route_controller_1.getRoutesHandler);
    /**
     * @openapi
     * /healthcheck:
     *  get:
     *     tags:
     *     - Healthcheck
     *     description: Responds if the app is up and running
     *     responses:
     *       200:
     *         description: App is up and running
     */
    app.get('/healthcheck', function (req, res) { return res.sendStatus(200); });
    /**
     * @openapi
     * '/api/users':
     *  post:
     *     tags:
     *     - User
     *     summary: Register a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *              $ref: '#/components/schemas/CreateUserInput'
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CreateUserResponse'
     *      409:
     *        description: Conflict
     *      400:
     *        description: Bad request
     */
    app.post('/api/users', (0, validateResource_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    app.post('/api/sessions', (0, validateResource_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
    app.get('/api/sessions', requireUser_1.default, session_controller_1.getUserSessionsHandler);
    app.delete('/api/sessions', requireUser_1.default, session_controller_1.deleteSessionHandler);
    app.post('/api/products', [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.createProductSchema)], product_controller_1.createProductHandler);
    /**
     * @openapi
     * '/api/products/{productId}':
     *  get:
     *     tags:
     *     - Products
     *     summary: Get a single product by the productId
     *     parameters:
     *      - name: productId
     *        in: path
     *        description: The id of the product
     *        required: true
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *          application/json:
     *           schema:
     *              $ref: '#/components/schema/Product'
     *       404:
     *         description: Product not found
     */
    app.put('/api/products/:productId', [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.updateProductSchema)], product_controller_1.updateProductHandler);
    app.get('/api/products/:productId', (0, validateResource_1.default)(product_schema_1.getProductSchema), product_controller_1.getProductHandler);
    app.delete('/api/products/:productId', [requireUser_1.default, (0, validateResource_1.default)(product_schema_1.deleteProductSchema)], product_controller_1.deleteProductHandler);
}
exports.default = routes;
