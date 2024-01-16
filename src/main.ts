import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { } from "qqlx-core";
import { toNumber, toString, toBoolean } from "qqlx-cdk";
import { getLocalNetworkIPs, CommonExceptionFilter, ResponseInterceptor, PondLogMessenger, DropletHostRpc } from "qqlx-sdk";

import { RestModule } from "./rest/module";

async function bootstrap () {
    const HTTP_PORT = 2101;

    // 对外的 RESTful API
    const app = await NestFactory.create(RestModule);
    app.useGlobalFilters(new CommonExceptionFilter(new PondLogMessenger(new DropletHostRpc())));
    app.useGlobalInterceptors(new ResponseInterceptor(new PondLogMessenger(new DropletHostRpc())));
    await app.listen(HTTP_PORT);

    // System tips
    console.log("\n---- ---- ---- main.ts @qqlx-droplet-host");
    const ips = getLocalNetworkIPs();
    for (const ip of ips) console.log(`${Object.values(ip).reverse().join(".")}`);
    console.log(`---- ---- ---- success on @http:${HTTP_PORT}`);
}
bootstrap();
