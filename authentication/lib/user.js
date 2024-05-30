import db from "./db";

export function createUSer(email, password) {
  const result=db.prepare("INSERT INTO users (email,password) VALUES (?,?)").run(
    email,
    password
  );
  return result.lastInsertRowid
}
