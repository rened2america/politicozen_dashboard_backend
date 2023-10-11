"use client";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
import { PrincipalTable } from "../components/PrincipalTable/principalTable";
import { LastOrders } from "../components/LastOrders/lastOrders";
import { useGetProducts } from "./products/useProduct";
import { useGetOrders } from "./hooks/useOrders";

const NewHome = () => {
  const { data } = useGetProducts();
  const { data: orders } = useGetOrders();
  console.log(orders);
  return (
    <PageLayout>
      <PageTitle>Dashboard</PageTitle>
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "calc(50%/3)",
        }}
      >
        <div
          style={{
            width: "200px",
            backgroundColor: "#fff27a",
            height: "200px",
            borderRadius: "16px",
            display: "grid",
            gridTemplateRows: "48px 1fr",
          }}
        >
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            Total Revenue
          </div>
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              ${orders?.data.amount}
            </div>
            <div
              style={{
                fontSize: "13px",
              }}
            >
              +20.1% from last month
            </div>
          </div>
        </div>
        <div
          style={{
            width: "200px",
            backgroundColor: "#35363d", // "#dcdcdd", //#33353b
            height: "200px",
            borderRadius: "16px",
            display: "grid",
            gridTemplateRows: "48px 1fr",
          }}
        >
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              fontSize: "14px",
              fontWeight: "700",
              color: "white",
            }}
          >
            Total Sales
          </div>
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "white",
              }}
            >
              {orders?.data.countSales}
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "white",
              }}
            >
              +16% from last month
            </div>
          </div>
        </div>
        <div
          style={{
            width: "200px",
            backgroundColor: "#dcdcdd", // "#dcdcdd", //#33353b
            height: "200px",
            borderRadius: "16px",
            display: "grid",
            gridTemplateRows: "48px 1fr",
          }}
        >
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            Total Designs
          </div>
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              {data?.data.products.length}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
        }}
      >
        <PrincipalTable />
      </div>
      <div>
        <LastOrders />
      </div>
    </PageLayout>
  );
};

export default NewHome;
