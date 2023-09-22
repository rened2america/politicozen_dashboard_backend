"use client";
import { NavLink } from "@/common/components/primitives/NavLink/NavLink";
import "./Layout.css";
import { IconHome } from "@/common/components/icons/IconHome";
import { IconLayout } from "@/common/components/icons/iconLayout";
import { Avatar } from "@/common/components/primitives/Avatar/Avatar";
import { FC, ReactNode } from "react";
import { IconOrders } from "@/common/components/icons/IconOrder";
import { usePathname } from "next/navigation";

type NewLayout = {
  children: ReactNode;
};

const NewLayout: FC<NewLayout> = ({ children }) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div
      style={{
        maxHeight: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "200px 1fr",
      }}
    >
      <nav
        style={{
          display: "grid",
          gridTemplateRows: "96px 1fr",
        }}
      >
        <header
          style={{
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            padding: "32px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr",
              alignItems: "center",
            }}
          >
            <img height="32px" width="28px" src="/LogoBlack.png" alt="logo" />
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                fontSize: "0.94rem",
                letterSpacing: "0",
                lineHeight: "1.3rem",
                fontWeight: "700",
                color: "#15171a",
              }}
            >
              Rene Alberto Meza Escamilla
            </div>
          </div>
        </header>
        <section
          style={{
            display: "grid",
            gridTemplateRows: "1fr 96px",
          }}
        >
          <div
            style={{
              color: "black",
            }}
          >
            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "start",
              }}
            >
              <NavLink path={pathname} href="/dashboard2">
                <IconHome />
                Home
              </NavLink>
            </div>
            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "start",
              }}
            >
              <NavLink path={pathname} href="/dashboard2/products">
                <IconLayout />
                Products
              </NavLink>
            </div>

            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "start",
              }}
            >
              <NavLink path={pathname} href="/dashboard2/orders">
                <IconOrders />
                Orders
              </NavLink>
            </div>
          </div>
          <footer
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <Avatar />
          </footer>
        </section>
      </nav>
      <main
        style={{
          borderLeft: "1px solid #e6e9eb",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default NewLayout;
