import { QueryResultRow } from "pg";
import OneRowMapper from "./one-row-mapper";

export default class OneIntMapper extends OneRowMapper<number> {
    mapRow(row: QueryResultRow): number {
        const oneInt: number = parseInt(row["one_int"]);
        if (isNaN(oneInt)) {
            throw new Error("Unable to parse '" + row["one_int"] + "' as an int");
        } else {
            return oneInt;
        }
    }
}
