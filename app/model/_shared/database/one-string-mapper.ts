import { QueryResultRow } from "pg";
import OneRowMapper from "./one-row-mapper";

export default class OneStringMapper extends OneRowMapper<string> {
    mapRow(row: QueryResultRow): string {
        return row["one_string"];
    }
}
