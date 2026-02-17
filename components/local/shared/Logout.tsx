"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useLogout } from "@/lib/api/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      router.push("/auth/login");
    } catch (err) {
      console.error("Logout error:", err);
      let msg = "Unable to log out. Please try again.";
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as any).data === "object" &&
        (err as any).data !== null &&
        "message" in (err as any).data
      ) {
        msg = (err as any).data.message;
      }
      toast.error(msg, { position: "top-right" });
    }
  };

  return (
    <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
      <LogOut />
      Log out
    </DropdownMenuItem>
  );
}
