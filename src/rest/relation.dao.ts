import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import type { DraftNodeRelation } from "qqlx-core";
import { RELATIONS_RIVER_DRAFT_NODE_RELATION } from "qqlx-core";
import { toNumber, toString, DraftNodeRelationSchema } from "qqlx-cdk";
import { getLocalNetworkIPs, PgDao } from "qqlx-sdk";

@Injectable()
export class DraftNodeRelationDao extends PgDao<DraftNodeRelation> {
    constructor(
        @InjectRepository(DraftNodeRelationSchema)
        private readonly repo: Repository<DraftNodeRelation>
    ) {
        super({
            repository: repo,
            relations_name: RELATIONS_RIVER_DRAFT_NODE_RELATION,
        });
    }
}
