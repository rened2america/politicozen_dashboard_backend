"use client";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
import axiosClient from "@/service/axiosInstance";
import { useState } from "react";

const Developer = () => {
  const [token, setToken] = useState("");
  const getToken = async () => {
    const token = await axiosClient.get("politicozen/generateToken");
    console.log(token);
    setToken(token.data.token);
  };

  return (
    <PageLayout>
      <PageTitle>Developer</PageTitle>
      <section>
        <div
          style={{
            border: "1px solid #e6e9eb",
            marginTop: "144px",
            display: "grid",
            gridTemplateRows: "1fr",
            borderRadius: "12px",
            padding: "36px",
          }}
        >
          <div
            style={{
              borderBottom: "1px solid rgba(55, 53, 47, 0.09)",
              fontSize: "16px",
              color: "rgb(55, 53, 47)",
              marginBottom: "24px",
              height: "40px",
              margin: "0 auto",
              width: "100%",
              maxWidth: "540px",
              fontWeight: "700",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div>Create Token</div>
            <div
              style={{
                display: "grid",
                alignItems: "center",
                justifyItems: "center",
                width: "88px",
                height: "40px",
                backgroundColor: "black",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
              }}
              onClick={getToken}
            >
              Create
            </div>
          </div>
          <fieldset
            style={{
              maxWidth: "540px",
              display: "grid",
              gridTemplateRows: "100px 100px 100px",
              gap: "16px",
              margin: "16px auto",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateRows: "16px 48px 16px",
                alignItems: "center",
              }}
            >
              <label
                htmlFor="user-name"
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#15171a",
                }}
              >
                Token
              </label>

              <input
                id="user-name"
                style={{
                  height: "40px",
                  padding: "6px 12px",
                  border: "1px solid #dddedf",
                  borderRadius: "4px",
                  width: "100%",
                }}
                //   {...register("name")}
                value={token}
              />
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "#738393",
                }}
              >
                Click the Create button
              </p>
            </div>
          </fieldset>
        </div>
      </section>
    </PageLayout>
  );
};
export default Developer;
