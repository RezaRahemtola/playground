import {DEFAULT_API_V2} from "aleph-sdk-ts/global";
import {store} from "aleph-sdk-ts";
import {ethereum} from "aleph-sdk-ts/accounts";
import {ItemType} from "aleph-sdk-ts/messages/message";

export const uploadFile = async (file: File) => {
  const {account} = ethereum.NewAccount();

  console.log(account.address);
  console.log(file.name);

  const confirmation = await store.Publish({
    channel: "TEST",
    account: account,
    fileObject: file,
    storageEngine: ItemType.storage,
    APIServer: DEFAULT_API_V2,
  });

  console.log(confirmation)
}
