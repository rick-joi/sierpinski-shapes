import { QueryResultRow } from "pg";
import Mapper from "./mapper";

export default abstract class OneRowMapper<T> extends Mapper {
  abstract mapRow(row: QueryResultRow): T;
}
