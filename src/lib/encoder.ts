import bcrypt from "bcrypt";

const encode = async (data: string): Promise<string> => {
  return await bcrypt.hash(data, 15);
};

const match = async (data: string, encrypted: string): Promise<boolean> => {
  return await bcrypt.compare(data, encrypted);
};

export default {
  encode,
  match,
};
