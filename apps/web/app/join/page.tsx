"use client";

import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { createRoom, joinRoom } from "@/lib/api";
import { getKeyPair } from "@/lib/sodium";
import { CreateRoomResponse } from "@/lib/types";
import { useRouter } from "next/navigation";
import sodium from "libsodium-wrappers";
import { useEffect, useRef } from "react";

export default function HomePage() {
  async function hostClick(publicKey: Uint8Array<ArrayBufferLike>) {
    const response: CreateRoomResponse = await (
      await createRoom(publicKey)
    ).json();
    // const rooms = sessionStorage.getItem("rooms");
    // if (rooms === null) {
    //   sessionStorage.setItem(
    //     "rooms",
    //     JSON.stringify([{ code: response.roomCode, isHost: true }]),
    //   );
    // } else {
    //   const roomsParsed = JSON.parse(rooms);
    //   roomsParsed.push({ code: roomCode, isHost: true });
    //   const newRooms = JSON.stringify(roomsParsed);
    //   sessionStorage.setItem("rooms", newRooms);
    // }

    router.push(`/chat/${response.roomCode}`);
  }

  async function joinClick(
    roomCode: string,
    publicKey: Uint8Array<ArrayBufferLike>,
  ) {
    await joinRoom(publicKey, roomCode);
    router.push(`/chat/${roomCode}`);
  }

  const router = useRouter();

  useEffect(() => {
    if (
      sessionStorage.getItem("privateKey") === null &&
      sessionStorage.getItem("publicKey") === null
    ) {
      const keyPair = getKeyPair();
      sessionStorage.setItem(
        "privateKey",
        sodium.to_string(keyPair.privateKey),
      );
      sessionStorage.setItem("publicKey", sodium.to_string(keyPair.publicKey));
    }
  }, []);

  const roomCode = useRef("");

  return (
    <main className="w-full h-dvh flex justify-center items-center">
      <Card className="">
        <CardHeader>
          <CardTitle>Connect to chat</CardTitle>
          <CardDescription>Create or join to a session</CardDescription>
          <CardAction>
            <ModeToggle></ModeToggle>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2">
          <Button
            onClick={() => {
              hostClick(
                sodium.from_base64(sessionStorage.getItem("publicKey")!),
              );
            }}
          >
            Host
          </Button>
          <div className="flex flex-row space-x-1">
            <InputOTP
              onChange={(value: string) => {
                roomCode.current = value;
              }}
              maxLength={6}
              minLength={6}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0}></InputOTPSlot>
                <InputOTPSlot index={1}></InputOTPSlot>
                <InputOTPSlot index={2}></InputOTPSlot>
              </InputOTPGroup>
              <InputOTPSeparator></InputOTPSeparator>
              <InputOTPGroup>
                <InputOTPSlot index={3}></InputOTPSlot>
                <InputOTPSlot index={4}></InputOTPSlot>
                <InputOTPSlot index={5}></InputOTPSlot>
              </InputOTPGroup>
            </InputOTP>
            <Button
              onClick={() => {
                joinClick(
                  roomCode.current,
                  sodium.from_base64(sessionStorage.getItem("publicKey")!),
                );
              }}
              className="flex-1"
              variant="outline"
            >
              Join
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
