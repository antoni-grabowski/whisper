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
import { createSession } from "@/lib/api";
import { createSocketConnection } from "@/lib/socket";
import { getKeyPair } from "@/lib/sodium";

async function hostClick() {
  const keyPair = getKeyPair();
  const data = (await createSession(keyPair.publicKey)).json();
  createSocketConnection();
}

export default function HomePage() {
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
          <Button onClick={hostClick}>Host</Button>
          <div className="flex flex-row space-x-1">
            <InputOTP maxLength={6}>
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
            <Button className="flex-1" variant="outline">
              Join
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
