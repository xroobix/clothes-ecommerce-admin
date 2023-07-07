'use client';

import { Button } from '@/components/ui/button';
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                size="icon"
                variant="destructive"
                onClick={() => onRemove(url)}
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              src={url}
              alt="Uploaded image"
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="d9tskumm">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" variant='outline' disabled={disabled} onClick={onClick}>
              <ImagePlus className="w-4 h-4 mr-2" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
