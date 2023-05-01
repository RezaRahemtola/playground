import { StoreMessage } from "aleph-sdk-ts/messages/message";

export const getExplorerLink = (message: StoreMessage): string => {
  return `https://explorer.aleph.im/address/${message.chain}/${message.sender}/message/${message.type}/${message.item_hash}`;
}
