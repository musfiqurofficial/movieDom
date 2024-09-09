import { useEffect } from "react";
import { useState } from "react";
import { getLSDB, updateLSDB, updateLSDBListItem } from "../api/localStore";

function useLS() {
  const [data, setData] = useState({});
  const settings = getLSDB("settings");
  const _my_list = getLSDB("_my_list");
  useState(() => {
    setData((data) => ({ ...data, ...settings, _my_list }));
  }, []);
  const updateLSDBLIST_By_context = (storeName, dt, operation) => {
    updateLSDBListItem(storeName, dt, operation);
    const _list = getLSDB(storeName);
    setData({
      ...data,
      ...settings,
      [storeName]: _list,
    });
  };
  const updateLS = (sroteName, dt) => {
    updateLSDB(sroteName, dt);
    setData((data) => ({ ...data, ...dt }));
  };
  const getLS = (storName) => getLSDB(storName);
  useEffect(()=>{
    let _my_list = getLSDB("_my_list");
    setData(s=>({...s,_my_list}));
  },[])
  return { data, updateLS, getLS,updateLSDBLIST_By_context };
}

export default useLS;
