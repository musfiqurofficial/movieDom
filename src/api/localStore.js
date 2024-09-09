import { ToastHeader } from "react-bootstrap";
import { toast } from "react-toastify";

export function getLSDB(storName) {
  return JSON.parse(localStorage.getItem(storName));
}
export function updateLSDB(storName, data) {
  if (!storName || !data) {
    return;
  } else {
    const previousData = getLSDB(storName);
    if (previousData) {
      let newDatas = { ...previousData, ...data };
      localStorage.setItem(storName, JSON.stringify(newDatas));
      return newDatas;
    } else {
      localStorage.setItem(storName, JSON.stringify(data));
      return data;
    }
  }
}

export function updateLSDBListItem(storeName, dt, operation) {
  if (!operation) {
    console.warn(
      "`updateLSDBList( storeName,dt, operation)` check the function"
    );
  } else {
    let previousList = getLSDB(storeName) || [];

    // IF PREVIOUSLIST IS AVAILABLE
    if (previousList.length !== 0) {
      const _already_in_list = previousList?.find((item) => {
        if (dt?.TVID) {
          return item?.TVID === dt?.TVID;
        } else {
          return item?.MovieID === dt?.MovieID;
        }
      });
      if (_already_in_list) {
        if (operation === "add") {
          toast.dismiss();
          toast.info(`${dt.MovieTitle || dt.TVtitle} is already in the list`);
        } else if (operation === "remove") {
          const _newList = previousList.filter(
            (item) => item.MovieID !== dt?.MovieID || item?.TVID !== dt?.TVID
          );
          toast.dismiss();
          toast.error(`"${dt.MovieTitle || dt.TVtitle}" removed from My List.`);
          localStorage.setItem(storeName, JSON.stringify(_newList));
        }
      } else {
        const _newList = [dt, ...previousList];
        toast.dismiss();
        toast.success(`"${dt.MovieTitle || dt.TVtitle}" added to My List.`);
        localStorage.setItem(storeName, JSON.stringify(_newList));
      }
    } else {
      toast.dismiss();
      toast.success(`"${dt.MovieTitle || dt.TVtitle}" added To My List.`);
      localStorage.setItem(storeName, JSON.stringify([dt]));
    }
  }

  // IF PREVIOUSLIST IS NOT AVAILABLE
}
