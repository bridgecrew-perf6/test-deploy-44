import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
// swagger-ui-express 와 swagger-jsdoc => api 명세 관련 모듈
import * as helmet from "helmet";
// helmet => 보안 관련 모듈

const app = express();

app.use(helmet.contentSecurityPolicy());
app.use(helmet.crossOriginEmbedderPolicy());
app.use(helmet.crossOriginOpenerPolicy());
app.use(helmet.crossOriginResourcePolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.originAgentCluster());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

const options = {
    swaggerDefinition: {
        info: {
            version: "0.0.1",
            title: "deploy-test",
            description: "deploy",
            servers: [{
                url: "http://localhost:3000"
            }]
        }
    },
    apis: [
        "build/swagger/models.js",
        "build/apiFolder/*.js",
        "build/apiFolder/**/*.js"
    ]
}
const swaggerDoc = swaggerJsDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, HEAD, OPTIONS");
    res.header("Access-Control-Allow-Headers","content-type, x-access-token, access-type, Authorization, authorization");
})

const url = "/api/v1";

import api from "./apiFolder";

app.use(url, api);

app.use(function(err:any, req: express.Request, res:express.Response, next: express.NextFunction) {
    if(!err) return next();

    res.locals.message = err.message;
    res.locals.error = req.app.get("env") ==="development" ? err : {};

    if(err.status === undefined ) {
        console.log(err.message);
        return res.status(500).json({
            message:
            "Sorry. the service is not accessible | Internal server Error",
            data: err.data
        })
    } else {
        return res.status(err.status);
    }
});

export default app;

