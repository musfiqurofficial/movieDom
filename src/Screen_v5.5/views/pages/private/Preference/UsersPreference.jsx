import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { Container } from "react-bootstrap";
import { fire_db } from "../../../../firebase/firebase.config";

const UsersPreference = ({ data = [], name = "",profile }) => {
  const property=name?.toLowerCase();
  const selected_items=profile[property]?.split(',') || [];
  const isSelected=(item)=>selected_items?.findIndex(ele=>ele===item)!==-1;

  const onSelect=(item)=>{
    if(isSelected(item)){
      const doc_ref = doc(fire_db, "profiles", profile.key);
      updateDoc(doc_ref, {
        [property]: selected_items.filter(ele=>ele!==item)?.join(",") || ''
      });
    }else{
  const doc_ref = doc(fire_db, "profiles", profile.key);
    updateDoc(doc_ref, {
      [property]: [...selected_items,item]?.join(",") || ''
    });
    }
  
    
  }

  return (
    <Container
      className="user-preference-selection"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="title">Pick {name}</h1>
      <p className="sub-title">
        Based on your selection of movie and TV {name}, <br /> we will know what we can
        recommend to you in the future.
      </p>

      <ul className="preferece-item-list">
        {data.map((item, index) => (
          <li>
            <button
              className={`preferece-item ${isSelected(item) ? "selected" : ""}`}
              onClick={()=>onSelect(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default UsersPreference;
