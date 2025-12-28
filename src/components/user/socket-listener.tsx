"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

export const SocketListener = () => {
  const router = useRouter();
  const { user } = useAuth();
  const socketRef = useRef<Socket | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/ka-ching.mp3");
    const unlockAudio = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            audioRef.current?.pause();
            audioRef.current!.currentTime = 0;
          })
          .catch(() => {});
      }
      document.removeEventListener("click", unlockAudio);
    };
    document.addEventListener("click", unlockAudio);

    if (!socketRef.current) {
      const socketUrl =
        process.env.NEXT_PUBLIC_SOCKET_IO_URL || "http://localhost:5000";
      socketRef.current = io(socketUrl, {
        transports: ["polling", "websocket"],
        autoConnect: true,
        reconnection: true,
      });
    }
    const socket = socketRef.current;

    const playNotificationSound = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    const handleJoinRooms = () => {
      if (!socket.connected) return;

      if (user?.id) {
        console.log("Bergabung ke room user:", user.id);
        socket.emit("join_user_room", { user_id: user.id });
      }

      if (user?.role === "admin") {
        console.log("Bergabung ke room admin");
        socket.emit("join_room", "admin_room");
      }
    };

    socket.on("connect", handleJoinRooms);

    handleJoinRooms();
    socket.on("haircut_transaction_status_updated", (data) => {
      router.refresh();
      const shortId = String(data.id).slice(0, 8);
      toast.info("Update Pesanan Haircut", {
        description: `ID: #${shortId} | Status: ${data.reservation_status}`,
        action: {
          label: "Cek",
          onClick: () => router.push(`/dashboard/transactions/haircut`),
        },
      });
    });

    socket.on("product_transaction_status_updated", (data) => {
      router.refresh();
      const shortId = String(data.id).slice(0, 8);
      toast.info("Update Pesanan Produk", {
        description: `ID: #${shortId} | Ekspedisi: ${data.expedition_status}`,
        action: {
          label: "Cek",
          onClick: () => router.push(`/dashboard/transactions/product`),
        },
      });
    });

    if (user?.role === "admin") {
      socket.on("new_haircut_transaction_created", (data) => {
        playNotificationSound();
        router.refresh();
        toast.success("Ada transaksi potong rambut baru!", {
          action: {
            label: "Lihat",
            onClick: () => {
              router.push(`/dashboard/transactions/haircut/${data.id}`);
            },
          },
        });
      });

      socket.on("new_product_transaction_created", (data) => {
        playNotificationSound();
        router.refresh();
        toast.success("Ada transaksi produk baru!", {
          action: {
            label: "Lihat",
            onClick: () => {
              router.push(`/dashboard/transactions/product/${data.id}`);
            },
          },
        });
      });

      socket.on("haircut_transaction_completed", (data) => {
        router.refresh();
        toast.success(
          `Status transaksi potong rambut #${data.id.slice(0, 8)} diperbarui menjadi "${data.status}".`,
        );
      });

      socket.on("haircut_receipt_uploaded", (data) => {
        router.refresh();
        toast.success(
          `Struk transaksi potong rambut #${data.id.slice(0, 8)} telah diunggah.`,
          {
            action: {
              label: "Lihat",
              onClick: () => {
                router.push(`/dashboard/transactions/haircut`);
              },
            },
          },
        );
      });

      socket.on("product_receipt_uploaded", (data) => {
        router.refresh();
        toast.success(
          `Struk transaksi produk #${data.id.slice(0, 8)} telah diunggah.`,
          {
            action: {
              label: "Lihat",
              onClick: () => {
                router.push(`/dashboard/transactions/product`);
              },
            },
          },
        );
      });
    }

    return () => {
      document.removeEventListener("click", unlockAudio);
      socket.off("connect");
      socket.off("haircut_transaction_status_updated");
      socket.off("product_transaction_status_updated");
      socket.off("new_haircut_transaction_created");
      socket.off("new_product_transaction_created");
      socket.off("haircut_transaction_completed");
      socket.off("haircut_receipt_uploaded");
      socket.off("product_receipt_uploaded");
    };
  }, [router, user]);

  return null;
};
