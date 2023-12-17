import { Repository } from "typeorm";

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import type { DraftNode } from "qqlx-core";
import { RELATIONS_RIVER_DRAFT_NODE } from "qqlx-core";
import { toNumber, toString, DraftNodeSchema } from "qqlx-cdk";
import { getLocalNetworkIPs, PgDao } from "qqlx-sdk";

@Injectable()
export class DraftNodeDao extends PgDao<DraftNode> {
    constructor(
        @InjectRepository(DraftNodeSchema)
        private readonly draftNodeRepository: Repository<DraftNodeSchema>
    ) {
        super({
            repository: draftNodeRepository,
            relations_name: RELATIONS_RIVER_DRAFT_NODE,
        });
    }
}
