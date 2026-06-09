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
import { cn } from "@/lib/utils";
import { CircleUserRound, Send, X } from "lucide-react";
import { useRef, useState } from "react";

async function joinChat() {}

export default function ChatPage(params: { roomCode: string }) {
  const roomCode = params.roomCode;
  type Message = { id: number; text: string; isOwn: boolean };
  const [messages, setMessages] = useState<Message[]>([]);

  const msg = useRef("");
  const counter = useRef(0);

  function sendMessage(msg: string) {
    let isOwnMod: boolean = counter.current % 2 == 0 ? false : true;
    setMessages((prev: Message[]) => [
      ...prev,
      { id: counter.current, text: msg, isOwn: isOwnMod },
    ]);
    counter.current++;
  }

  return (
    <main className="w-full h-dvh flex justify-center items-center">
      <Card className="w-1/2 h-3/4">
        <CardHeader className="flex flex-row items-center">
          <CircleUserRound />
          Username
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
