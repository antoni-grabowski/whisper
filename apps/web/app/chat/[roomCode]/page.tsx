"use client";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { amIHost } from "@/lib/api";
import { createSocketConnection } from "@/lib/socket";
import { encryptMessage } from "@/lib/sodium";
import { cn } from "@/lib/utils";
import sodium from "libsodium-wrappers";
import { CircleUserRound, Send, X } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";

export default function ChatPage({
  params,
}: {
  params: Promise<{ roomCode: string }>;
}) {
  const { roomCode } = use(params);

  const socket = useRef(createSocketConnection());
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const isHost = useRef<boolean>(false);

  useEffect(() => {
    async function checkIfHost() {
      const response = await amIHost(
        roomCode,
        sodium.from_base64(sessionStorage.getItem("publicKey") ?? ""),
      );
      isHost.current = ((await response.json()) as { isHost: boolean }).isHost;
    }
    checkIfHost();
    socket.current = createSocketConnection();
    socket.current.on("connect", () => {
      setIsSocketConnected(true);
      if (!isHost) {
      }
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  type Message = { id: number; text: string; isOwn: boolean };
  const [messages, setMessages] = useState<Message[]>([]);

  const msg = useRef("");

  function sendMessage(msg: string) {
    // const encryptedMessage = encryptMessage(msg);
    if (socket.current !== null) {
      //   socket.current.emit("send-message", encryptedMessage);
    }
  }

  return (
    <main className="w-full h-dvh flex justify-center items-center">
      <Card className="w-1/2 h-3/4">
        <CardHeader className="flex flex-row items-center">
          <div>{roomCode}</div>
          <ModeToggle className="ml-auto"></ModeToggle>
          <Button size="icon">
            <X></X>
          </Button>
        </CardHeader>
        <Separator />
        <CardContent className="flex-1 min-h-0">
          <ScrollArea className="w-full h-full">
            <div className="flex flex-col">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    msg.isOwn ? "justify-end" : "justify-start",
                    "w-full",
                    "flex",
                  )}
                >
                  <Card className="w-1/3 m-1">
                    <CardContent className="">{msg.text}</CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="">
          <ButtonGroup className="flex-1">
            <Input
              className=""
              placeholder="Message"
              onChange={(e) => (msg.current = e.target.value)}
            ></Input>
            <Button
              variant="outline"
              size="icon"
              onClick={() => sendMessage(msg.current)}
            >
              <Send />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </main>
  );
}
