'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

import styles from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const inputRef = useRef();
  const [pickedImage, setPickedImage] = useState('');

  function handlePickClick() {
    inputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (url) => {
      setPickedImage((prev) => fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} alt='The image selected by user' fill />
          )}
        </div>
        <input
          className={styles.input}
          ref={inputRef}
          id={name}
          name={name}
          onChange={handleImageChange}
          type='file'
          accept='image/png, image/jpeg'
          required
        />
        <button
          className={styles.button}
          onClick={handlePickClick}
          type='button'
          aria-label='Pick an image'
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
