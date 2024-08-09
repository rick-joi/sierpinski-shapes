import { QueryResultRow } from "pg";
import Dao from "../_shared/database/dao";
import OneRowMapper from "../_shared/database/one-row-mapper";

class SessionDao extends Dao {
  //
  constructor() {
    super();
  }

  async insertSession(ipAddress: string, userAgent: string): Promise<string> {
    //
    const SQL = `
        insert into session (ip_address, user_agent) values
          ($1, $2)
          returning session_uuid
      `;
    return super.selectOneString(SQL, ipAddress, userAgent);
  }

  insertActivity(sessionUuid: string, url: string, formData: string, ipAddress: string): Promise<number | null> {
    //
    const SQL = `
        with session_update as (
          update session set last_activity_datetime = current_timestamp
            where session_uuid = $1
            returning session_id, ip_address
        )
        insert into session_activity (session_id, url, form_data, ip_address)
          select su.session_id, $2, $3, case when $4 = su.ip_address then null else $4 end
            from session_update su
            returning session_id as one_int
        `;
    return super.selectZeroOrOneInt(SQL, sessionUuid, url, formData, ipAddress);
  }

  async updateLastActivity(sessionUuid: string): Promise<number | null> {
    //
    const SQL = `
        update session set last_activity_datetime = current_timestamp
          where session_uuid = $1
          returning session_id as one_int`;
    return super.selectZeroOrOneInt(SQL, sessionUuid);
  }

  async selectSession(sessionId: number): Promise<Session> {
    //
    const SQL = `
        select s.session_id, p.name, p.email_address
          from session s
          left join person p on s.person_id = p.person_id
          where session_uuid = $1
      `;
    return super.selectOne(new SessionMapper(), SQL, sessionId);
  }
}

class SessionMapper extends OneRowMapper<Session> {
  //
  mapRow(row: QueryResultRow): Session {
    //
    return new Session(
      this.mapInteger(row, "session_id"),
      this.mapStringOrNull(row, "name"),
      this.mapStringOrNull(row, "email_address")
    );
  }
}

export default class Session {
  //
  private static dao = new SessionDao();

  static async createSession(ipAddress: string, userAgent: string): Promise<string> {
    return this.dao.insertSession(ipAddress, userAgent);
  }

  static async recordSessionActivity(
    sessionUuid: string,
    url: string,
    formData: string,
    ipAddress: string
  ): Promise<number | null> {
    return this.dao.insertActivity(sessionUuid, url, formData, ipAddress);
  }

  static async getSession(sessionId: number): Promise<Session> {
    return this.dao.selectSession(sessionId);
  }

  // static async connectPersonToSession(sessionId: number, name: string | null, emailAddress: string | null) : Promise<boolean> {
  //   throw new Error("Not implemented, yet");
  // }

  readonly id: number;
  readonly name: string | null;
  readonly emailAddress: string | null;

  constructor(id: number, name: string | null, emailAddress: string | null) {
    this.id = id;
    this.name = name;
    this.emailAddress = emailAddress;
  }
}
