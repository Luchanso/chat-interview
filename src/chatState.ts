import { makeVar, useReactiveVar } from "@apollo/client";
import { useMemo } from "react";
import { channels, userMap } from "./data";

export const userState = makeVar<string | undefined>(undefined);
export const channelState = makeVar<string | undefined>(undefined);

export function useUserById(id: string) {
  return userMap[id];
}

export function useChannelName() {
  const channel = useReactiveVar(channelState);

  const channelName = useMemo(
    () => channels.find(({ id }) => id === channel)?.name,
    [channel]
  );
  return channelName;
}
