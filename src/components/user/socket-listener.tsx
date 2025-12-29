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

      if (user?.role === "user" && user.id) {
        socket.emit("join_user_room", { user_id: user.id });
      }

      if (user?.role === "admin" && user.id) {
        socket.emit("join_admin_room", "admin_room");
      }
    };

    socket.on("connect", handleJoinRooms);

    handleJoinRooms();
    socket.on("haircut_transaction_status_updated", (data) => {
      router.refresh();
      const shortId = String(data.id).slice(0, 8);
      toast.info("Update Pesanan Haircut", {
        duration: 5000,
        description: (
          <div className="mt-2 space-y-1 text-xs">
            <p className="capitalize">
              <span className="font-semibold">ID:</span> #{shortId}
            </p>
            <p className="capitalize">
              <span className="font-semibold">Status:</span>{" "}
              {data.reservation_status}
            </p>
            <p className="capitalize">
              <span className="font-semibold">Pembayaran:</span>{" "}
              {data.payment_status}
            </p>
          </div>
        ),
        action: {
          label: "Lihat",
          onClick: () => router.push(`/dashboard/transactions/haircut`),
        },
      });
    });

    socket.on("product_transaction_status_updated", (data) => {
      router.refresh();
      const shortId = String(data.id).slice(0, 8);
      toast.info("Update Pesanan Produk", {
        duration: 5000,
        description: (
          <div className="mt-2 space-y-1 text-xs">
            <p className="capitalize">
              <span className="font-semibold">ID:</span> #{shortId}
            </p>
            <p className="capitalize">
              <span className="font-semibold">Ekspedisi:</span>{" "}
              {data.expedition_status}
            </p>
            <p className="capitalize">
              <span className="font-semibold">Pembayaran:</span>{" "}
              {data.payment_status}
            </p>
          </div>
        ),
        action: {
          label: "Lihat",
          onClick: () => router.push(`/dashboard/transactions/product`),
        },
      });
    });

    if (user?.role === "admin") {
      socket.on("new_haircut_transaction_created", (data) => {
        playNotificationSound();
        router.refresh();
        toast.info("Ada transaksi potong rambut baru!", {
          duration: 5000,
          description: `ID: #${String(data.id).slice(0, 8)}`,
          action: {
            label: "Lihat",
            onClick: () => {
              router.push(`/dashboard/transactions/haircuts`);
            },
          },
        });
      });

      socket.on("new_product_transaction_created", (data) => {
        playNotificationSound();
        router.refresh();
        toast.info("Ada transaksi produk baru!", {
          duration: 5000,
          description: `ID: #${String(data.id).slice(0, 8)}`,
          action: {
            label: "Lihat",
            onClick: () => {
              router.push(`/dashboard/transactions/products`);
            },
          },
        });
      });

      socket.on("haircut_transaction_completed", (data) => {
        router.refresh();
        toast.info(
          `Status transaksi potong rambut #${data.id.slice(0, 8)} diperbarui menjadi "${data.status}".`,
          {},
        );
      });

      socket.on("haircut_transaction_receipt_uploaded", (data) => {
        router.refresh();
        toast.info(
          `Struk transaksi potong rambut #${data.id.slice(0, 8)} telah diunggah.`,
          {
            duration: 5000,
            action: {
              label: "Lihat",
              onClick: () => {
                router.push(`/dashboard/transactions/haircuts`);
              },
            },
          },
        );
      });

      socket.on("product_transaction_receipt_uploaded", (data) => {
        router.refresh();
        toast.info(
          `Struk transaksi produk #${data.id.slice(0, 8)} telah diunggah.`,
          {
            duration: 5000,
            action: {
              label: "Lihat",
              onClick: () => {
                router.push(`/dashboard/transactions/products`);
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
      socket.off("haircut_transaction_receipt_uploaded");
      socket.off("product_transaction_receipt_uploaded");
    };
  }, [router, user]);

  return null;
};
