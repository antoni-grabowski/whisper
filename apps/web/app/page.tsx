"use client";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  function toJoinPage() {
    router.push("/join");
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="text-9xl" onClick={() => toJoinPage()}>
        Whisper...
      </div>
    </div>
  );
}
