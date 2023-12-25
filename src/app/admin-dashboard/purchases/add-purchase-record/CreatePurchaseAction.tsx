"use client";
import React, { useState } from "react";
import UploadFile from "../../../../components/UploadFile";
import { useEdgeStore } from "@/lib/edgestore";
import FindUser from "../FindUser";
import useToastMsg from "@/hooks/useToastMsg";

const CreatePurchaseAction = () => {
  const [files, setFiles] = useState<string[]>([]);
  const { component, setAlertMsg, setToastType } = useToastMsg();
  const [loading, setLoading] = useState(false);
  const [clearFileState, setClearFileState] = useState(false);

  const [purchaseInput, setPurchaseInput] = useState({
    userId: "",
    billamount: "",
  });

  const { edgestore } = useEdgeStore();
  const handlePurchase = async (e: any) => {
    e.preventDefault();
    try {
      if (!purchaseInput.userId || !purchaseInput.billamount || !files.length) {
        setAlertMsg("All fields are required");
        setToastType("alert-error");
        return;
      }
      setLoading(true);
      await edgestore.publicFiles.confirmUpload({ url: files[0] });

      const res = await fetch("/api/purchases/admin", {
        method: "POST",
        body: JSON.stringify({ ...purchaseInput, file: files[0] }),
      });
      const apiResponse = await res.json();
      if (res.status === 201) {
        setAlertMsg("record added successfully");
        setToastType("alert-success");
        setLoading(false);
        setClearFileState((prev) => !prev);
        setFiles([]);
        setPurchaseInput({ userId: "", billamount: "" });
      } else {
        setAlertMsg(apiResponse.error || "something went wrong");
        setToastType("alert-error");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      throw new Error("Internal server Error");
    }
  };

  return (
    <div className="w-full">
      {component}
      <div className="flex md:items-stretch md:flex-row gap-4 flex-col">
        <div>
          <FindUser />
          <input
            value={purchaseInput.userId}
            onChange={(e) =>
              setPurchaseInput({ ...purchaseInput, userId: e.target.value })
            }
            placeholder="User Id"
            className="input-base"
          />
          <input
            value={purchaseInput.billamount}
            onChange={(e) =>
              setPurchaseInput({ ...purchaseInput, billamount: e.target.value })
            }
            type="number"
            placeholder="Bill Amount"
            className="input-base"
          />

          {!loading ? (
            <button onClick={handlePurchase} className="base-btn w-full mt-4">
              Save
            </button>
          ) : (
            <button className="base-btn w-full mt-4">
              <span className="loading loading-spinner" />
            </button>
          )}
        </div>
        <div>
          <p className="text-center text-[0.8rem] badge m-auto badge-warning">
            Only Upload One File(.pdf)
          </p>
          <p className="text-[0.8rem] ">other files will be useless</p>
          <UploadFile setFiles={setFiles} clearFileState={clearFileState} />
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseAction;
