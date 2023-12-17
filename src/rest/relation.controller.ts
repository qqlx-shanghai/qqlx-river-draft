import { Controller, Query, Body, Get, Post, Patch, UseGuards } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import axios from "axios";
import type { AxiosInstance } from "axios";

import { PATH_RIVER_DRAFT_NODE } from "qqlx-core";
import { toNumber, toString, ToResponse, getPageDto, getResponseData } from "qqlx-cdk";
import { getLocalNetworkIPs, DropletLocationMessenger, UserGuard } from "qqlx-sdk";

import { DraftNodeDao } from "./node.dao";
import { DraftNodeRelationDao } from "./relation.dao";

@Controller()
@UseGuards(UserGuard)
export default class {
    request!: AxiosInstance;
    constructor(
        //
        private readonly DraftNodeDao: DraftNodeDao,
        private readonly DraftNodeRelationDao: DraftNodeRelationDao
    ) {}
}
