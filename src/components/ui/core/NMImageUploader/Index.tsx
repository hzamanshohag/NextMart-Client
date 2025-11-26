import { useState } from "react";
import { Input } from "../../input";
import { Label } from "../../label";

const NMImageUploader = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);

  const handleimageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files![0];
    setImageFiles((prevFiles) => [...prevFiles, files]);
  };

  return (
    <div>
      <Input
        onChange={handleimageChange}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        id="image-uploader"
      />
      <Label
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
        htmlFor="image-uploader"
      >
        Uploaded Logo
      </Label>
    </div>
  );
};

export default NMImageUploader;
