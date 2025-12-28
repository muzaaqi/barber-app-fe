"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SocketListener = () => {
  const router = useRouter();
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

      const socket = socketRef.current;

      const playNotificationSound = () => {
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          const playPromise = audioRef.current.play();

          if (playPromise !== undefined) {
            playPromise.catch(() => {
              toast("Notifikasi suara tertahan", {
                description: "Klik di sini untuk mengaktifkan suara.",
                action: {
                  label: "Aktifkan",
                  onClick: () => audioRef.current?.play(),
                },
                duration: 5000,
              });
            });
          }
        }
      };

      socket.on("connect", () => {
        socket.emit("join_room", "admin_room");
      });

      socket.on("connect_error", (err) => {
        console.error("Connection Error:", err.message);
      });

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

      socket.on("disconnect", (reason) => {
        console.warn("Disconnected:", reason);
      });
    }

    return () => {
      document.removeEventListener("click", unlockAudio);
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [router]);

  return null;
};
