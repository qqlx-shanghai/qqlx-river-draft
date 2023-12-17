import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import {} from "qqlx-core";
import { toNumber, toString, toBoolean } from "qqlx-cdk";
import { getLocalNetworkIPs, CommonExceptionFilter, ResponseInterceptor, PondLogMessenger, DropletLocationMessenger } from "qqlx-sdk";

import { RestModule } from "./rest/module";

async function bootstrap() {
    const HTTP_PORT = 2101;

    // 对外的 RESTful API
    const app = await NestFactory.create(RestModule);
    app.useGlobalFilters(new CommonExceptionFilter(new PondLogMessenger(new DropletLocationMessenger())));
    app.useGlobalInterceptors(new ResponseInterceptor(new PondLogMessenger(new DropletLocationMessenger())));
    await app.listen(HTTP_PORT);

    // System tips
    console.log("\n---- ---- ---- main.ts");
    const ipstrs = Object.values(getLocalNetworkIPs()[0] || {})
        .reverse()
        .join(".");
    console.log(`qqlx-river-draft:ip: ${ipstrs}`);
    console.log(`qqlx-river-draft:http: ${HTTP_PORT}`);
    console.log("---- ---- ---- \nrunning success!");
}
bootstrap();
