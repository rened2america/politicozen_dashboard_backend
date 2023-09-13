import Image from "next/image";
import styles from "./globalLayout.module.css";
import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  Avatar,
  Button,
  Strong,
} from "@radix-ui/themes";
import {
  PlusCircledIcon,
  HomeIcon,
  StackIcon,
  CubeIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Flex align="center" justify="center">
          <div className={styles.logo}>
            <Avatar size="2" src="/LogoWhite.png" fallback="R" />
          </div>
        </Flex>
        <div className={styles.sectionMenu}>
          <div className={styles.newProduct}>
            <Button variant="soft" size="2">
              <PlusCircledIcon width="16" height="16" />
              New Product
            </Button>
          </div>
          <div className={styles.list}>
            <Link href="/dashboard">
              <Button variant="ghost">
                <HomeIcon width="16" height="16" /> Home
              </Button>
            </Link>
            <Link href="/dashboard/products">
              <Button variant="ghost">
                <CubeIcon width="16" height="16" /> Products
              </Button>
            </Link>
            <Link href="/dashboard/orders">
              <Button variant="ghost">
                <StackIcon width="16" height="16" /> Orders
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.buttomSection}>
          <Avatar
            size="3"
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="R"
          />
          <ExitIcon />
        </div>
      </div>
      <div className={styles.section}> {children}</div>
    </div>
  );
}
