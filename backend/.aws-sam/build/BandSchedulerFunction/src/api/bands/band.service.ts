import { dynamo, BANDS_TABLE_NAME } from "../../lib/dynamo";
import crypto from "crypto";

export interface BandPayload {
  name: string;
  vocal_names: string[];
  guitar_names: string[];
  bass_names: string[];
  drum_names: string[];
  keyboard_names: string[];
  other_names: string[];
  song_name: string;
  leader_name: string;
}

export const getBands = async () => {
  const result = await dynamo.scan({ TableName: BANDS_TABLE_NAME }).promise();
  return result.Items || [];
};

export const getBandById = async (id: string) => {
  const result = await dynamo
    .get({ TableName: BANDS_TABLE_NAME, Key: { id } })
    .promise();
  return result.Item;
};

export const createBand = async (data: BandPayload) => {
  const newBand = {
    id: crypto.randomUUID(),
    ...data,
    created_at: new Date().toISOString(),
  };
  await dynamo.put({ TableName: BANDS_TABLE_NAME, Item: newBand }).promise();
  return newBand;
};

export const updateBand = async (id: string, data: BandPayload) => {
  const bandToUpdate = {
    id,
    ...data,
    updated_at: new Date().toISOString(),
  };
  await dynamo
    .put({ TableName: BANDS_TABLE_NAME, Item: bandToUpdate })
    .promise();
  return bandToUpdate;
};

export const deleteBand = async (id: string) => {
  return dynamo.delete({ TableName: BANDS_TABLE_NAME, Key: { id } }).promise();
};
