import User from "./User";

export async function createIndexes() {
  await User.createIndexes(); // Creates unique indexes
}
