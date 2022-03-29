import { Box } from "rebass";
import { Label } from "@rebass/forms";
import { Root, BeatifulSelect, Channel } from "./styles";
import { channelState, userState } from "../chatState";
import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { users, channels } from "../data";

export function Sidebar() {
  const user = useReactiveVar(userState);
  const channel = useReactiveVar(channelState);

  useEffect(() => {
    userState(users[0].id);
    channelState(channels[0].id);
  }, []);

  return (
    <Root>
      <Box mb={4}>
        <Label htmlFor="username" mb={2} fontWeight="bold">
          Username
        </Label>
        <BeatifulSelect
          id="username"
          name="username"
          defaultValue=""
          value={user}
          onChange={(e) => userState(e.target.value)}
        >
          {users.map(({ name, id }) => (
            <option key={id} onSelect={console.log}>
              {name}
            </option>
          ))}
        </BeatifulSelect>
      </Box>

      <Box>
        <Label htmlFor="channel" fontWeight="bold" mb={2}>
          Channels
        </Label>
        <Box>
          {channels.map(({ name, id }) => (
            <Channel
              key={id}
              active={channel === id}
              onClick={() => channelState(id)}
            >
              {name}
            </Channel>
          ))}
        </Box>
      </Box>
    </Root>
  );
}
