"use client";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useRef } from "react";
import { useStore } from "@/zustand/store";
const page = () => {
  const { user } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const startCall = async () => {
    if (!containerRef) return null;
    try {
      const appId = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
      const appSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        appSecret!,
        "nfjkanfkj",
        user?._id.toString()!,
        "Anubhav",
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showPreJoinView: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={containerRef} className="h-screen">
      <button onClick={startCall}>Click</button>
    </div>
  );
};

export default page;
