import { QueryResultRow } from "pg";
import Mapper from "./mapper";

export default abstract class ZeroOrMoreRowsMapper<T> extends Mapper {
  abstract mapRow(row: QueryResultRow): void;

  abstract getMapping(): T;
}
