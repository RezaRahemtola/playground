import { DEFAULT_API_V2 } from "aleph-sdk-ts/global";
import { Publish } from "aleph-sdk-ts/messages/store";
import { NewAccount } from "aleph-sdk-ts/accounts/ethereum";
import { ItemType, StoreMessage } from "aleph-sdk-ts/messages/message";

export const uploadFile = async (file: File): Promise<StoreMessage> => {
  const { account } = NewAccount();

  console.log(`Account ${account.address} wants to upload file "${file.name}"`);
  if (file.name === "")
    throw new Error("Please select a file to upload.");

  const confirmation = await Publish({
    channel: "TEST",
    account: account,
    fileObject: file,
    storageEngine: ItemType.storage,
    APIServer: DEFAULT_API_V2,
  });

  console.log(`Confirmation:`, confirmation);
  return (confirmation);
}
