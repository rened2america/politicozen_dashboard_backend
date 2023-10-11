"use client";
import { Avatar } from "@radix-ui/react-avatar";
import { ClockIcon } from "@radix-ui/react-icons";

export const LastOrders = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "100px 1fr",
        marginTop: "40px",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: "700",
        }}
      >
        Recently orders
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            width: "100%",
            gridTemplateColumns: "48px 1fr 1fr 1fr 150px",
            justifyItems: "center",
            alignItems: "center",
            fontSize: "14px",
            fontWeight: "700",
            height: "80px",
          }}
        >
          <div>
            <img
              style={{
                borderRadius: "48px",
              }}
              width="48"
              height="48"
              src="https://politicozen-test.s3.us-east-2.amazonaws.com/1695055120858-TEST%20SEPT-green-product"
              alt=""
            />
          </div>
          <div>The Next Step – Shirt</div>
          <div>Payment</div>
          <div>Received</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "24px 1fr",

              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <ClockIcon /> Payment 4h
          </div>
        </div>
      </div>
    </div>
  );
};
