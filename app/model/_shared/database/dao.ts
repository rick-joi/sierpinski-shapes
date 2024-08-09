import pg, { QueryResultRow } from "pg";
import OneRowMapper from "./one-row-mapper";
import ZeroOrMoreRowsMapper from "./zero-or-more-rows-mapper";
import OneStringMapper from "./one-string-mapper";
import OneIntMapper from "./one-int-mapper";
import DaoError from "./dao-error";

export default abstract class Dao {
  //
  private static pool = this.initializePool();

  private static initializePool(): pg.Pool {
    const pool = new pg.Pool({
      ssl: {
        rejectUnauthorized: false,
      },
    });
    pool.on("error", (err: Error, client: pg.PoolClient) => console.error(err + "\n\nclient.query=" + client.query));
    return pool;
  }

  protected constructor() {}

  private async query(sql: string, ...args: unknown[]): Promise<pg.QueryResult<QueryResultRow>> {
    try {
      return await Dao.pool.query(sql, args);
    } catch (error: unknown) {
      throw new DaoError("Error running query", error, sql, ...args);
    }
  }

  protected async selectZeroOrMore<T>(
    zeroOrMoreRowsMapper: ZeroOrMoreRowsMapper<T>,
    sql: string,
    ...args: unknown[]
  ): Promise<T> {
    const queryResult = await this.query(sql, ...args);
    for (const row of queryResult.rows) {
      zeroOrMoreRowsMapper.mapRow(row);
    }
    return zeroOrMoreRowsMapper.getMapping();
  }

  protected async selectOneOrMore<T>(
    multiRowMapper: ZeroOrMoreRowsMapper<T>,
    sql: string,
    ...args: unknown[]
  ): Promise<T> {
    const queryResult = await this.query(sql, ...args);
    if (queryResult.rows.length === 0) {
      throw new DaoError("Expected at least one row but found zero", null, sql, args);
    }
    for (const row of queryResult.rows) {
      multiRowMapper.mapRow(row);
    }
    return multiRowMapper.getMapping();
  }

  protected async selectZeroOrOne<T>(
    oneRowMapper: OneRowMapper<T>,
    sql: string,
    ...args: unknown[]
  ): Promise<T | null> {
    const queryResult = await this.query(sql, ...args);
    if (queryResult.rows.length > 1) {
      throw new DaoError(`Expected zero or one row but found ${queryResult.rows.length}`, null, sql, args);
    } else {
      return queryResult.rows.length === 0 ? null : oneRowMapper.mapRow(queryResult.rows[0]);
    }
  }

  protected async selectOne<T>(oneRowMapper: OneRowMapper<T>, sql: string, ...args: unknown[]): Promise<T> {
    const result: T | null = await this.selectZeroOrOne(oneRowMapper, sql, ...args);
    if (result === null) {
      throw new DaoError("Expected one row but found zero", null, sql, args);
    }
    return result as T;
  }

  protected async selectOneString(sql: string, ...args: unknown[]): Promise<string> {
    return this.selectOne(new OneStringMapper(), sql, ...args);
  }

  protected async selectOneInt(sql: string, ...args: unknown[]): Promise<number> {
    return this.selectOne(new OneIntMapper(), sql, ...args);
  }

  protected async selectZeroOrOneInt(sql: string, ...args: unknown[]): Promise<number | null> {
    return this.selectZeroOrOne(new OneIntMapper(), sql, ...args);
  }

  protected async modify(sql: string, ...args: unknown[]): Promise<number> {
    const queryResult = await this.query(sql, ...args);
    return queryResult.rowCount ?? 0;
  }

  protected async modifyZeroOrOneRow(sql: string, ...args: unknown[]): Promise<boolean> {
    const rowsAffected = await this.modify(sql, ...args);
    if (rowsAffected > 1) {
      throw new DaoError(`Expected to modify zero or one row but modified ${rowsAffected}`, null, sql, args);
    } else {
      return rowsAffected === 1;
    }
  }

  protected async modifyOneRow(sql: string, ...args: unknown[]): Promise<void> {
    const rowsAffected = await this.modify(sql, ...args);
    if (rowsAffected !== 1) {
      throw new DaoError(`Expected to modify one row but modified ${rowsAffected}`, null, sql, ...args);
    }
    return;
  }

  protected adjustDateToUtc(date: Date | null): Date | null {
    if (date === null) {
      return null;
    }
    const time = date.getTime();
    const timezoneOffset = date.getTimezoneOffset();
    return new Date(time + timezoneOffset * 60000);
  }
}
