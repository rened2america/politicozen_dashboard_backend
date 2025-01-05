import { IconUpload } from "@/common/components/icons/IconUpload";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";

interface CroppingSectionProps {
  urlImage: string | null;
  crop: { x: number; y: number };
  zoom: number;
  setCrop: (val: { x: number; y: number }) => void;
  setZoom: (val: number) => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
  setUrlImage: (val: string) => void;
  setSelectedFile: (file: File) => void;
  isLoadingArt?: boolean;
  showCroppedImage?: () => void; // if child wants to trigger parent's function
  onClose?: () => void;
  handleSuccess?: (msg: string) => void;
  handleError?: (msg: string) => void;
}

const CroppingSection: React.FC<CroppingSectionProps> = ({
  urlImage,
  crop,
  zoom,
  setCrop,
  setZoom,
  onCropComplete,
  setUrlImage,
  setSelectedFile,
}) => {
  // Use dropzone to handle file selection
  const {
    getInputProps,
    acceptedFiles,
    fileRejections,
    getRootProps,
  } = useDropzone({
    multiple: false,
    maxFiles: 1,
    maxSize: 31457280, // 30MB
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles[0]) {
        setUrlImage(URL.createObjectURL(acceptedFiles[0]));
        setSelectedFile(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="grid gap-4 bg-gray-900 p-6 w-80 rounded border shadow-md ">


      {/* 1) Cropping Section */}
      <div className="text-white">Aspect Ratio 1/1</div>
      <div className="relative h-64 border border-gray-600 rounded">
        {urlImage ? (
          <Cropper
            image={urlImage}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            minZoom={0.5}
            restrictPosition={false}
            style={{
              containerStyle: {
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              mediaStyle: { background: "transparent" },
            }}
          />
        ) : (
          <div className="text-center text-gray-400 p-4">
            No image selected yet.
          </div>
        )}
      </div>

      {/* 2) Zoom Slider */}
      <input
        type="range"
        value={zoom}
        min={0.5}
        max={3}
        step={0.05}
        onChange={(e) => setZoom(Number(e.target.value))}
        className="w-full mt-2"
      />

      {/* 3) Dropzone */}
      <div
        {...getRootProps({
          className: "dropzone",
        })}
        className="flex items-center justify-center p-2 bg-gray-700 rounded border border-gray-600 cursor-pointer"
      >
        <input {...getInputProps()} />
        {acceptedFiles.length > 0 ? (
          <div className="text-white">{acceptedFiles[0].path}</div>
        ) : fileRejections.length > 0 &&
          fileRejections[0].errors[0].code === "file-too-large" ? (
          <div className="text-red-600 font-bold">
            File is larger than 30 Mb
          </div>
        ) : (
          <div className="text-white">Upload logo in PNG/WEBP</div>
        )}
        <div className="text-white ml-2 p-1 border border-gray-500 rounded-full">
          <IconUpload />
        </div>
      </div>
    </div>
  );
};

export default CroppingSection;