"use client";
import React, { useCallback, useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { useFormik } from "formik";
import Link from "next/link";
import Button from "../components/Button";
import * as Yup from "yup";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, onSnapshot, setDoc } from "@firebase/firestore";
import { db } from "../services/firebase";
import toast from "react-hot-toast";

type CompanyDetails = {
  percentage: number;
  no_of_users: number;
  company_name: string;
  no_of_products: number;
};

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const storage = getStorage();
  const [file, setFile] = useState<File | string | null>(null);

  const handleSubmit = useCallback(
    async (values: CompanyDetails, { setSubmitting }: any) => {
      try {
        await setDoc(doc(db, "company_details", "test_company"), values);
        toast.success("Submitted successfully");
        setSubmitting(false);
      } catch (e) {
        setSubmitting(false);
      }
    },
    [userEmail]
  );

  const handleSubmitImage = useCallback(async () => {
    setLoading(true);
    try {
      // Upload the file and metadata
      if (file && typeof file !== "string") {
        const storageRef = ref(storage, "test_company");
        const metadata = {
          contentType: file.type,
        };
        const uploadTask = await uploadBytes(storageRef, file, metadata);

        setLoading(false);
        toast.success("Submitted successfully");
      }
    } catch (e: any) {
      toast.error(e?.message || e);
      setLoading(false);
    }
  }, [file]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    const file = files[0];
    setFile(file);
  };

  const form = useFormik({
    initialValues: {
      percentage: 0,
      no_of_users: 0,
      company_name: "",
      no_of_products: 0,
    },
    onSubmit: handleSubmit,
    validationSchema: Yup.object().shape({
      percentage: Yup.number()
        .min(0, "Invalid percentage")

        .required("this field is required"),
      company_name: Yup.string()
        .min(3, "Invalid Company Name")

        .required("this field is required"),
      no_of_users: Yup.number()
        .min(0, "Invalid number")
        .required("this field is required"),
      no_of_products: Yup.number()
        .min(0, "Invalid number")
        .required("this field is required"),
    }),
  });

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      id: string,
      type: "text" | "password" | "number"
    ) => {
      const { no_of_products, no_of_users } = form.values;
      const value = e.target.value;

      form?.setValues({
        ...form.values,
        [id]: type === "number" ? Number(value) : value,
        percentage:
          id === "no_of_users" && no_of_products
            ? Number(((Number(value) / no_of_products) * 100).toFixed(3))
            : id === "no_of_products" && no_of_users
            ? Number(((no_of_users / Number(value)) * 100).toFixed(3))
            : 0,
      });
    },
    [form]
  );

  useEffect(() => {
    (async () => {
      try {
        const unsub = onSnapshot(
          doc(db, "company_details", "test_company"),
          (doc) => {
            if (doc.data()) {
              const data: any = doc.data();
              const { percentage, no_of_users, company_name, no_of_products } =
                data;
              form.setValues({
                percentage,
                no_of_users,
                company_name,
                no_of_products,
              });
            }
          }
        );
        getDownloadURL(ref(storage, "test_company"))
          .then((url) => {
            setFile(url);
          })
          .catch((error) => {
            // toast.error(error?.message || error);
          });

        return () => unsub();
      } catch (error: any) {
        toast.error(error?.message || error);
      }
    })();
  }, []);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setUserEmail(email);
  }, []);

  return (
    <div className="flex justify-center  w-screen bg-white p-4 py-12 sm:items-center">
      <div className=" bg-gray-100 container pt-10 px-3 sm:px-10 py-14">
        <div className="flex justify-center sm:justify-normal flex-wrap">
          <h3 className="text-3xl m-2 my-4">Welcome {userEmail}</h3>
          {typeof file === "string" && userEmail === "testuser1@gmail.com" ? (
            <img className="h-[90px]  object-contain" src={file} />
          ) : (
            <></>
          )}
        </div>

        {userEmail === "testuser1@gmail.com" ? (
          <>
            <div className="flex flex-col md:flex-row  gap-x-10   ">
              <div className="h-[65%] flex-1    flex justify-center flex-col">
                <TextInput
                  form={form}
                  required={true}
                  type="text"
                  id="company_name"
                  title="Enter Company Name"
                />
                <TextInput
                  form={form}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, "no_of_users", "number");
                  }}
                  required={true}
                  type="number"
                  id="no_of_users"
                  title="Enter Number Of Users"
                />
                <TextInput
                  form={form}
                  required={true}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, "no_of_products", "number");
                  }}
                  type="number"
                  id="no_of_products"
                  title="Enter Number Of Products"
                />
              </div>
              <div className="h-[65%] flex-1 flex justify-center flex-col">
                <TextInput
                  form={form}
                  required={true}
                  type="text"
                  id="percentage"
                  title="Enter Percentage"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-center gap-12 flex-wrap">
              <Link href={"login"}>
                <Button
                  disabled={false}
                  type="warning"
                  loading={false}
                  title="Login out"
                />
              </Link>

              <Button
                disabled={!form.dirty || !form.isValid || form.isSubmitting}
                type="active"
                handleClick={() => form.handleSubmit()}
                loading={form.isSubmitting}
                title="Submit"
              />
            </div>
          </>
        ) : userEmail === "testuser2@gmail.com" ? (
          <>
            <div className="flex flex-col md:flex-row  gap-x-10   ">
              <div className="h-[65%] flex-1    flex justify-center flex-col">
                <TextInput
                  form={form}
                  disabled={true}
                  required={true}
                  type="text"
                  id="company_name"
                  title="Uploaded Company Name"
                />
                <TextInput
                  disabled={true}
                  form={form}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, "no_of_users", "number");
                  }}
                  required={true}
                  type="number"
                  id="no_of_users"
                  title="Uploaded Number Of Users"
                />
                <TextInput
                  disabled={true}
                  form={form}
                  required={true}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange(e, "no_of_products", "number");
                  }}
                  type="number"
                  id="no_of_products"
                  title="Uploaded Number Of Products"
                />
              </div>
              <div className="h-[65%] flex-1 flex justify-center flex-col">
                <TextInput
                  form={form}
                  required={true}
                  type="text"
                  id="percentage"
                  disabled={true}
                  title="Uploaded Percentage"
                />
                {
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text">Upload an Image</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="file-input file-input-bordered w-full max-w-xs"
                    />
                  </label>
                }
              </div>
            </div>

            <div className="flex w-full items-center justify-center mt-6 gap-x-12 gap-y-4 flex-wrap">
              <Link href={"login"}>
                <Button
                  disabled={false}
                  type="warning"
                  loading={false}
                  title="Login out"
                />
              </Link>
              <Button
                disabled={!file}
                type="active"
                handleClick={() => handleSubmitImage()}
                loading={loading}
                title="Submit"
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
