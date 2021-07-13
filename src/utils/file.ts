/* eslint-disable no-empty */
import fs from 'fs';

export const deleteFile = async (filename: string): Promise<void> => {
  try {
    await fs.promises.stat(filename);
  } catch (error) {}

  await fs.promises.unlink(filename);
};
