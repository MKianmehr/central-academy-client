import React, { useEffect } from 'react'
import { useRouter } from "next/router";

const useRtl = () => {
    const router = useRouter();
    useEffect(() => {
        let dir = router.locale == "fa" ? "rtl" : "ltr";
        let lang = router.locale == "fa" ? "fa" : "en";
        document?.querySelector("html")?.setAttribute("dir", dir);
        document?.querySelector("html")?.setAttribute("lang", lang);
    }, [router.locale]);
}

export default useRtl