import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { getCroppedImg } from "./cropImage";

const AvatarUploader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
      setIsModalOpen(true);
    }
  };

  const onCropComplete = (
    croppedAreaPercentage: Area,
    croppedAreaPixels: Area
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const saveCroppedImage = async () => {
    if (imageSrc && croppedArea) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedArea);
        setCroppedImage(croppedImage);
      } catch (e) {
        console.error(e);
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ textAlign: "left" }}>
      <div
        style={{
          width: 170,
          height: 170,
          borderRadius: "50%",
          backgroundColor: "red",
          display: "inline-block",
          cursor: "pointer",
          backgroundImage: `url(${croppedImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        {!croppedImage && (
          <span
            style={{ lineHeight: "100px", color: "white", fontSize: 50 }}
          ></span>
        )}
      </div>
      <br />
      <a
        variant="primary"
        onClick={() => setIsModalOpen(true)}
        className="css-choose-image"
      >
        Choose image
      </a>

      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Avatar</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "3px",
              marginBottom: "10px",
              paddingRight: "38%",
              fontSize: "17px",
            }}
          />
          {imageSrc && (
            <div style={{ position: "relative", width: "100%", height: 300 }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveCroppedImage}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvatarUploader;
