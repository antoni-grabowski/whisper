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
import { amIHost, getGuestPublicKey, getHostPublicKey } from "@/lib/api";
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

  const socket = useRef<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const messageId = useRef(0);
  const [isHostState, setIsHostState] = useState<boolean | null>(null);

  useEffect(() => {
    async function init() {
      checkIfHost().then((response) => {
        const isHost = response.isHost;
        setIsHostState(isHost);
        socket.current =
          socket.current == null ? createSocketConnection() : socket.current;
        socket.current.on("connect", () => {
          setIsSocketConnected(true);
          if (socket.current !== null) {
            if (isHost) {
              socket.current.emit("host-joined", roomCode);
              socket.current.on("guest-joined", () => {
                setGuestPublicKey(roomCode);
              });
            }
            if (!isHost) {
              socket.current.emit("guest-join", roomCode);
              setHostPublicKey(roomCode);
            }
            socket.current.on("receive-message", (msg, isSenderAHost) => {
              const publicKey = isHostState
                ? sessionStorage.getItem("guestPublicKey")
                : sessionStorage.getItem("hostPublicKey");
              encryptMessage(
                msg,
                publicKey ?? "",
                sessionStorage.getItem("privateKey") ?? "",
              );
              setMessages((prev) => {
                return [
                  ...prev,
                  {
                    id: messageId.current,
                    text: msg,
                    isOwn: isSenderAHost == isHost ? true : false,
                  },
                ];
              });
              messageId.current += 1;
            });
          }
        });
      });
    }
    function checkIfHost() {
      return amIHost(roomCode, sessionStorage.getItem("publicKey") ?? "");
    }
    async function setGuestPublicKey(roomCode: string) {
      const response = await getGuestPublicKey(roomCode);
      sessionStorage.setItem(
        "guestPublicKey",
        (await response.json()).guestPublicKey,
      );
    }
    async function setHostPublicKey(roomCode: string) {
      const response = await getHostPublicKey(roomCode);
      sessionStorage.setItem(
        "hostPublicKey",
        (await response.json()).hostPublicKey,
      );
    }
    init();
    return () => {
      socket.current?.disconnect();
      socket.current == null;
    };
  }, []);

  type Message = { id: number; text: string; isOwn: boolean };
  const [messages, setMessages] = useState<Message[]>([]);

  const msg = useRef("");

  function sendMessage(msg: string, roomCode: string) {
    if (isHostState != null) {
      const publicKey = isHostState
        ? sessionStorage.getItem("guestPublicKey")
        : sessionStorage.getItem("hostPublicKey");
      const encryptedMessage = encryptMessage(
        msg,
        publicKey ?? "",
        sessionStorage.getItem("privateKey") ?? "",
      );
      setMessages((prev) => {
        return [
          ...prev,
          {
            id: messageId.current,
            isOwn: true,
            text: msg,
          },
        ];
      });

      messageId.current += 1;

      if (socket.current !== null && isSocketConnected) {
        socket.current.emit("send-message", msg, roomCode);
        //   socket.current.emit("send-message", encryptedMessage);
      }
    }
  }

  return (
    <main className="w-full h-dvh flex justify-center items-center">
      <Card className="w-1/2 h-3/4">
        <CardHeader className="flex flex-row items-center">
          <div>{roomCode}</div>
          <div>{isHostState}</div>
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
              onClick={() => sendMessage(msg.current, roomCode)}
            >
              <Send />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </main>
  );
}
