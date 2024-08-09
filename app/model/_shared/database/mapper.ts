import { QueryResultRow } from "pg";

export default abstract class Mapper {
  public Mapper() {}

  protected mapNumber(row: QueryResultRow, columnName: string): number {
    const value = row[columnName];
    const valueAsNumber = Number(value);
    if (isNaN(valueAsNumber)) {
      throw new Error(`${columnName} value "${value}" is not a number`);
    } else {
      return valueAsNumber;
    }
  }

  protected mapNumberOrNull(row: QueryResultRow, columnName: string): number | null {
    const value = row[columnName];
    return value === null ? null : this.mapNumber(row, columnName);
  }

  protected mapInteger(row: QueryResultRow, columnName: string): number {
    const value = row[columnName];
    const valueAsNumber = Number(value);
    if (Number.isInteger(valueAsNumber)) {
      return valueAsNumber;
    } else {
      throw new Error(`${columnName} value "${value}" is not an integer`);
    }
  }

  protected mapIntegerOrNull(row: QueryResultRow, columnName: string): number | null {
    const value = row[columnName];
    return value === null ? null : this.mapInteger(row, columnName);
  }

  protected mapString(row: QueryResultRow, columnName: string): string {
    const value = row[columnName];
    if (typeof value === "string") {
      return value as string;
    } else {
      throw new Error(`${columnName} value "${value}" with type "${typeof value}" is not a string`);
    }
  }

  protected mapJson(row: QueryResultRow, columnName: string): object {
    const value = row[columnName];
    if (typeof value === "object") {
      return value as object;
    } else {
      throw new Error(`${columnName} value "${value}" with type "${typeof value}" is not an object`);
    }
  }

  protected mapStringOrNull(row: QueryResultRow, columnName: string): string | null {
    const value = row[columnName];
    return value === null ? null : this.mapString(row, columnName);
  }

  protected mapDate(row: QueryResultRow, columnName: string): Date {
    const dateOrNull = this.mapDateOrNull(row, columnName);
    if (dateOrNull === null) {
      throw new Error(columnName + " is null");
    } else {
      return dateOrNull as Date;
    }
  }

  protected mapDateOrNull(row: QueryResultRow, columnName: string): Date | null {
    const value = row[columnName];
    if (value instanceof Date || value === null) {
      return value as Date | null;
    } else {
      throw new Error(`${columnName} value "${value}" with type "${typeof value}" is not a date`);
    }
  }

  protected mapBoolean(row: QueryResultRow, columnName: string): boolean {
    const value = row[columnName];
    if (typeof value === "boolean") {
      return value as boolean;
    } else {
      throw new Error(`${columnName} value "${value}" with type "${typeof value}" is not a boolean`);
    }
  }

  protected mapBooleanOrNull(row: QueryResultRow, columnName: string): boolean | null {
    const value = row[columnName];
    return value === null ? null : this.mapBoolean(row, columnName);
  }
}
