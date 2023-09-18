import { create } from "zustand";

const initialState = {
  imgLogo: "/1200px-Starbucks_Logo_ab_2011.svg.png",
  imgBase64Logo: "",
  imgProduct: [],
  name: "",
  product: "",
  color: "",
  x: 0,
  y: 0,
  z: 0.1,
  angle: 0,
  height: 0,
  width: 0,
  scale: 0,
  save: false,
};

export const useProductStore = create((set) => {
  return {
    ...initialState,
    addNewImgProduct: (imgProduct: string) => {
      set((state: any) => {
        return {
          ...state,
          imgProduct: [...state.imgProduct, imgProduct],
        };
      });
    },
    updatePosition: (position: any) => {
      set(() => {
        return {
          x: position.x,
          y: position.y,
          z: position.z,
        };
      });
    },
    updateDimensions: (dimensions: any) => {
      set(() => {
        return {
          height: dimensions.height,
          width: dimensions.width,
          scale: dimensions.scale,
        };
      });
    },

    updateColor: (color: string) => set({ color }),
    updateName: (name: string) => set({ name }),
    updateProduct: (product: string) => set({ product }),
    updateImgLogo: (imgLogo: string) => set({ imgLogo }),
    updateSave: (save: boolean) => set({ save }),
    updateAngle: (angle: number) => set({ angle }),
    updateImgBase64Logo: async (imgBase64Logo: string) => {
      function blobUrlToBase64(blobUrl: any) {
        return new Promise((resolve, reject) => {
          // Realiza una solicitud para obtener el Blob
          fetch(blobUrl)
            .then((response) => response.blob())
            .then((blob) => {
              // Convierte el Blob en un ArrayBuffer
              console.log(blob);
              var reader = new FileReader();
              reader.readAsArrayBuffer(blob);
              reader.onload = function () {
                // Convierte el ArrayBuffer en una cadena base64
                var base64data = arrayBufferToBase64(reader.result);
                resolve(base64data);
              };
              reader.onerror = function () {
                reject(new Error("Error al leer el Blob como ArrayBuffer"));
              };
            })
            .catch((error) => {
              reject(error);
            });
        });
      }

      // Función para convertir un ArrayBuffer en una cadena base64
      function arrayBufferToBase64(buffer: any) {
        var binary = "";
        var bytes = new Uint8Array(buffer);
        for (var i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }
      const imgLogo = await blobUrlToBase64(imgBase64Logo);
      set({
        imgBase64Logo: imgLogo,
      });
    },
    reset: () => {
      set(initialState);
    },
  };
});
