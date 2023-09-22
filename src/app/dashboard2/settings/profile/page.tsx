const Profile = () => {
  return (
    <section
      style={{
        padding: "0 48px 48px",
      }}
    >
      <header
        style={{
          color: "#15171a",
          fontSize: "32px",
          fontWeight: "700",
          padding: "24px 0px",
        }}
      >
        Rene Alberto Meza Escamilla
      </header>
      <section>
        <form
          style={{
            position: "relative",
            display: "grid",
            gridTemplateRows: "300px 1fr",
          }}
        >
          <figure
            style={{
              backgroundImage:
                "url(https://assets.ghost.io/admin/1585/assets/img/user-cover-e8f42b12b5fcba292a8b5dfa81e13dd2.png)",
            }}
          ></figure>
          <figure
            style={{
              width: "120px",
              height: "120px",
              position: "absolute",
              top: "236px",
              left: "0px",
              right: "0px",
              textAlign: "center",
              margin: "0px auto",
            }}
          >
            <div
              style={{
                backgroundSize: "cover",
                backgroundImage:
                  "url(https://assets.ghost.io/admin/1585/assets/img/user-image-639a88b784fb5f10964be8b975ca9fdf.png)",
                width: "100%",
                height: "100%",
                backgroundPosition: "50%",
                borderRadius: "9999px",
              }}
            ></div>
          </figure>
          <div
            style={{
              border: "1px solid #e6e9eb",
              marginTop: "80px",
              display: "grid",
              gridTemplateRows: "1fr",
              borderRadius: "12px",
              padding: "24px",
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
              }}
            >
              My profile
            </div>
            <fieldset
              style={{
                maxWidth: "540px",
                display: "grid",
                gridTemplateRows: "100px 100px 100px",
                gap: "16px",
                margin: "0 auto",
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
                  Full name
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
                />
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  Use your real name so people can recognize you
                </p>
              </div>
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
                  Email
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
                />
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  Used for notifications
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "16px 1fr 16px",
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
                  Bio
                </label>
                <textarea
                  id="user-name"
                  style={{
                    maxHeight: "100px",
                    minHeight: "60px",
                    height: "100%",
                    padding: "6px 12px",
                    border: "1px solid #dddedf",
                    borderRadius: "4px",
                    width: "100%",
                  }}
                />
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  Recommended: 200 characters
                </p>
              </div>
            </fieldset>

            <div
              style={{
                borderBottom: "1px solid rgba(55, 53, 47, 0.09)",
                fontSize: "16px",
                color: "rgb(55, 53, 47)",
                marginBottom: "24px",
                marginTop: "48px",
                height: "40px",
                margin: "0 auto",
                width: "100%",
                maxWidth: "540px",
                fontWeight: "700",
              }}
            >
              My social media
            </div>
            <fieldset
              style={{
                maxWidth: "540px",
                display: "grid",
                gridTemplateRows: "100px 100px 100px",
                gap: "16px",
                margin: "0 auto",
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
                  Instagram
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
                />
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  URL of your personal Instagram
                </p>
              </div>
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
                  Facebook
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
                />
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#738393",
                  }}
                >
                  URL of your personal Facebook
                </p>
              </div>
            </fieldset>
          </div>
        </form>
        <form></form>
      </section>
    </section>
  );
};
export default Profile;
