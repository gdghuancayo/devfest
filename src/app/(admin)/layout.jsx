
"use client";

import { useEffect, useState, useContext } from "react";

import { useRouter } from "next/navigation";
import { AppContext } from "@/app/context";

export default function AdminLayout({ children }) {
     // Contexto
 const router = useRouter();
 
  const { authLoading, loginState, loginInfo } = useContext(AppContext);

 const [resolver, setResolver] = useState(false);

 useEffect(() => {
     const permmisionMails = ["jose@doctoc.health", "diegomalpi@gmail.com"];
    if (!authLoading) {
      if (loginState) {
        //console.log(permmisionMails.includes(String(loginInfo.mail || "").trim()))
        if (permmisionMails.includes(String(loginInfo.mail || "").trim())) {
            setResolver(true);
        } else {
          router.push("/pacientes");
        }
      } else {
        router.push("/ingreso");
      }
    }
    }, [authLoading, loginState, loginInfo]);
  return (
    <div>
      {!resolver ? (
            <div className="flex items-center justify-center w-screen h-screen">
              <div className="-mt-14">
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          ) : (
            children
          )}
    </div>
  );
}