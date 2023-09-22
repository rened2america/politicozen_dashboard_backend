"use client";
import * as AvatarRadix from "@radix-ui/react-avatar";
import { IconArrowDown } from "../../icons/IconArrowDown";
import styles from "./Avatar.module.css";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./nstyle.css";
export const Avatar = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className={styles["avatar-content"]}>
          <AvatarRadix.Root className={styles["avatar-root"]}>
            <AvatarRadix.Fallback className={styles["avatar-fallback"]}>
              PD
            </AvatarRadix.Fallback>
          </AvatarRadix.Root>
          <IconArrowDown />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <DropdownMenu.Item className="DropdownMenuItem">
            <Link href="/dashboard2/settings/profile">Your profile</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="DropdownMenuSeparator" />
          <DropdownMenu.Item className="DropdownMenuItem">
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
