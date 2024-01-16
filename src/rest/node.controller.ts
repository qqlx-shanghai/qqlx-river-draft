import { Controller, Query, Body, Get, Post, Patch, UseGuards } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";
import axios from "axios";
import type { AxiosInstance } from "axios";

import { PATH_RIVER_DRAFT_NODE, postDraftNodeDto, getDraftNodeDto, disableDraftNodeDto, postDraftNodeRes, getDraftNodeRes, DraftNode, DraftNodeRelation, ENUM_DRAFT_NODE_RELATION, _Owner } from "qqlx-core";
import { toNumber, toString, ToResponse, getPageDto, getResponseData, isValid, DraftNodeRelationSchema, getConditionMatchInteger } from "qqlx-cdk";
import { getLocalNetworkIPs, DropletHostRpc, UserGuard } from "qqlx-sdk";

import { DraftNodeDao } from "./node.dao";
import { DraftNodeRelationDao } from "./relation.dao";

@Controller(PATH_RIVER_DRAFT_NODE)
@UseGuards(UserGuard)
export default class {
    request!: AxiosInstance;
    constructor(
        //
        private readonly DraftNodeDao: DraftNodeDao,
        private readonly DraftNodeRelationDao: DraftNodeRelationDao
    ) { }

    @Post()
    async post (@Body('dto') dto: postDraftNodeDto, @Body('Owner') Owner: _Owner): Promise<postDraftNodeRes> {
        const { schema, pid, relation } = dto

        schema.uuid32 = Owner.uuid32
        const entity: DraftNode = await this.DraftNodeDao.insertOne(schema);
        const relation_schema: DraftNodeRelation = new DraftNodeRelationSchema()
        relation_schema.uuid32 = Owner.uuid32
        relation_schema.cid = entity.id

        if (isValid(pid) && isValid(relation)) {
            relation_schema.pid = toNumber(pid)
            relation_schema.relation = relation as ENUM_DRAFT_NODE_RELATION
        } else {
            relation_schema.pid = entity.id
            relation_schema.isRoot = true
        }
        await this.DraftNodeRelationDao.insertOne(relation_schema);

        return null;
    }

    // @Post("/get")
    // async get(dto: getDraftNodeDto): Promise<getDraftNodeRes> {
    // const entity = await this.DraftNodeDao.insertOne(dto.schema);

    // dto.relation.cid = entity.id;
    // await this.DraftNodeRelationDao.insertOne(dto.relation);

    // return null;
    // }
}
