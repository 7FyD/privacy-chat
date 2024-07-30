"use client";

import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center my-48">
      <ClipLoader size={64} />
    </div>
  );
}
