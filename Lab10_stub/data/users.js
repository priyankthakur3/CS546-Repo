//import mongo collections, bcrypt and implement the following data functions
import bcrypt from "bcrypt";
import validations from "../helpers.js";
import { users } from "../config/mongoCollections.js";
const passwordEncryptRounds = 10;

export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  firstName = validations.isStringName("First Name", firstName);
  lastName = validations.isStringName("First Name", lastName);
  emailAddress = validations.checkMail(emailAddress);
  password = validations.checkPassword(password);
  role = validations.isString("Role", role);
  if (role !== "admin" && role !== "user")
    throw new Error(`Expected role to be user or admin`);
  let userCollection = await users();

  const checkIfUserExist = await userCollection.findOne(
    { emailAddress },
    { projection: { _id: 1 } }
  );

  if (checkIfUserExist) throw new Error(`User already Exists in Database!`);

  let hashedPassword = await bcrypt.hash(password, passwordEncryptRounds);
  let newUser = {
    firstName,
    lastName,
    emailAddress,
    password: hashedPassword,
    role,
  };
  let userInsertedInfo = await userCollection.insertOne(newUser);
  if (!userInsertedInfo.acknowledged || !userInsertedInfo.insertedId)
    throw new Error(`Could not Create User`);
  else
    return {
      insertedUser: true,
    };
};

export const checkUser = async (emailAddress, password) => {
  emailAddress = validations.checkMail(emailAddress);
  password = validations.checkPassword(password);
  let usersCollection = await users();
  let dbUser = await usersCollection.findOne(
    { emailAddress },
    {
      projection: {
        _id: 1,
        firstName: 1,
        lastName: 1,
        emailAddress: 1,
        password: 1,
        role: 1,
      },
    }
  );
  if (!dbUser) throw new Error(`Either email or password is invalid`);

  if (!(await bcrypt.compare(password, dbUser.password)))
    throw new Error(`Either email or password is invalid`);
  return {
    firstName: dbUser.firstName,
    lastName: dbUser.lastName,
    emailAddress: dbUser.emailAddress,
    role: dbUser.role,
  };
};

export default { createUser, checkUser };
