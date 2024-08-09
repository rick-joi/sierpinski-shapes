export default class DaoError extends Error {
  //
  constructor(context: string, causingError: unknown | null, sql: string, ...args: unknown[]) {
    super(DaoError.getMessage(context, sql, args), DaoError.getCause(causingError));
  }

  private static getMessage(context: string, sql: string, args: unknown[]) {
    return context + "\nArguments:" + JSON.stringify(args) + "\nSQL:\n" + sql;
  }

  private static getCause(causingError: unknown | null): ErrorOptions | undefined {
    return causingError ? { cause: causingError } : undefined;
  }
}
