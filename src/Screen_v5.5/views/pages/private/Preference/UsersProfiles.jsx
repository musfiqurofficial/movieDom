import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { lang } from "../../../../data/language";
import PROFILE_IMAGES from "../../../../data/PROFILE_IMAGES";
import { IconButton } from "../../../components/common/buttons/Buttons";
import Icon from "../../../components/icons/Icons";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { fire_db } from "../../../../firebase/firebase.config";
import { _HIT_ORIGINE } from "../../../../const";

const UserPopup = ({
  popup,
  popupData,
  popupOpen,
  popupClose,
  manageProfile,
  onChangePopupData,
}) => {
  const { account, profiles } = useSelector((store) => store.user);
  const [data, setData] = React.useState({});
  const [show_imgs, setShowImgs] = React.useState(false);
  const onSelectImage = (item) => {
    setData((state) => ({ ...state, img: item }));
  };

  React.useEffect(() => {
    setData(popupData);
  }, [popupData]);

  const onChangeData = (property, value) =>
    setData((state) => ({ ...state, [property]: value }));
  const onShowImgs = () => setShowImgs(true);
  const onHideImgs = () => setShowImgs(false);
  const onSubmit = (e) => {
    e.preventDefault();
    let save_able_data = {
      uid: account.uid,
      name: data.name || "",
      img: data.img || "",
      lan: data.lan || lang[0],
      autoplay: !!data?.autoplay,
      next_epi: !!data.next_epi,
    };
    if (data?.key) {
      // IF : UPDATE USER
      const doc_ref = doc(fire_db, "profiles", data.key);
      const update_promise = updateDoc(doc_ref, data);
      toast
        .promise(update_promise, {
          success: "Profile Updated",
          pending: "Please Wait.",
        })
        .then(() => {
          popupClose();
        })
        .catch((err) => {
          toast.error(err.code);
        });
    }
    if (
      save_able_data.name &&
      save_able_data.img &&
      save_able_data.uid &&
      profiles.length < 5
    ) {
      if (!data?.key) {
        // ELSE : ADD NEW PROFILE
        const add_profile = addDoc(
          collection(fire_db, "profiles"),
          save_able_data
        );
        toast
          .promise(add_profile, {
            success: "Profile Saved",
            pending: "Please Wait.",
          })
          .then(() => {
            popupClose();
          })
          .catch((err) => {
            console.error(err);
            toast.error(err.code);
          });
      }
    } else {
      if (!save_able_data.name) {
        toast.error("Profile name is invalid.");
      } else if (!save_able_data.img) {
        toast.error("Profile image is invalid.");
      } else if (profiles.length >= 5 && !data.uid) {
        toast.error("Can't add more profile.");
      }
    }
  };

  return (
    <div
      className="manage-profile-edit-profile-popup px-10"
      style={{
        opacity: popup ? 1 : 0,
        visibility: popup ? "visible" : "hidden",
        transform: popup ? "scale(1)" : "scale(0.8)",
      }}
    >
      <div id="page">
        <IconButton className="mb-10" onClick={popupClose}>
          <Icon.ArrowThinLeft color="white" />
        </IconButton>
        <h1 className="">Edit Profile</h1> <hr />
        <Row>
          <Col xs={4}>
            {data.img && (
              <>
                <img
                  src={`${_HIT_ORIGINE}profile-images/${data.img}`}
                  alt=""
                  className="rounded-6 profile-img"
                />
                <button
                  onClick={onShowImgs}
                  type="button"
                  className="btn rounded-0 mt-10 white-btn"
                >
                  Change Image
                </button>
              </>
            )}
            {!data.img && (
              <button onClick={onShowImgs} className="bg-transparent">
                <div className="profile-add-placeholder">
                  <i className="fa-solid fa-plus fx-2"></i>
                </div>
                <p className='mt-10 fw-bold'>Add Image</p>
              </button>
            )}
          </Col>
          <Col>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={data.name || ""}
                onChange={(e) => onChangeData("name", e.target.value)}
                placeholder="Profile Name"
                className="user-name-input"
                name="user_name"
              />
              <p className="mb-6 fs-20">Language :</p>
              <select
                name="users_language"
                value={data.lan}
                defaultValue={lang[0]}
                onChange={(e) => onChangeData("lan", e.target.value)}
              >
                {lang.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              <hr />
              <label
                htmlFor="next_epi_checkBox_user_setting"
                className="d-flex flex-row gap-10 "
                style={{
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="next_epi"
                  id="next_epi_checkBox_user_setting"
                  // className="d-none"
                  checked={data.next_epi}
                  onChange={(e) => onChangeData("next_epi", e.target.checked)}
                />
                <div className="check-box w-30-px h-30-px center position-relative mdom-bg-light-30">
                  <Icon.ThinDone size="18px" color="white" />
                </div>{" "}
                <p className=".fs-12">
                  Autoplay previews while browsing on all devices.
                </p>
              </label>
              <label
                htmlFor="auto_play_next_epi"
                className="d-flex flex-row gap-10 "
                style={{
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="next_epi"
                  id="auto_play_next_epi"
                  // className="d-none"
                  checked={data.autoplay}
                  onChange={(e) => onChangeData("autoplay", e.target.checked)}
                />
                <div className="check-box w-30-px h-30-px center position-relative">
                  <Icon.ThinDone size="18px" color="white" />
                </div>{" "}
                <p className=".fs-12">
                  Autoplay next episode in a series on all devices.
                </p>
              </label>

              <div className="btns d-flex gap-10 mt-30">
                <button type="submit" className="white-btn py-8 px-16">
                  Save
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
      <Modal
        show={show_imgs}
        onHide={onHideImgs}
        centered
        size="lg"
        style={{
          zIndex: 10000000,
        }}
      >
        <Modal.Header
          className="border-bottom-0"
          closeVariant="white"
          closeButton
        >
          <Modal.Title className="mb-0">Select Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row xs={2} sm={3} md={5} lg={6}>
            {PROFILE_IMAGES.map((item) => (
              <Col className="p-4 p-md-5">
                <button
                  className={`bg-transparent p-0 h-100 border ${
                    item.path === data.img ? " border-2" : "border-0"
                  }`}
                  onClick={() => onSelectImage(item.path)}
                >
                  <img
                    src={`${_HIT_ORIGINE}profile-images/${item.path}`}
                    alt={item.path}
                    className="w-100 rounded-3 profile-img"
                  />
                </button>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const UsersProfiles = ({ manageProfile = false }) => {
  const [popup, setPopup] = React.useState(false);
  const [popupData, setPopupData] = React.useState({});
  const { profiles } = useSelector((store) => store.user);
  const popupOpen = () => setPopup(true);
  const popupClose = () => setPopup(false);
  const onChangePopupData = (data) => setPopupData(data);

  return (
    <>
      <ul className="user-profile-wrapper">
        {profiles.map((item, index) => (
          <li
            className={`user-profile ${
              index === 0 && !manageProfile ? "active" : ""
            }`}
            key={item.id}
            onClick={() => {
              if (manageProfile) {
                popupOpen();
                onChangePopupData(item);
              }
            }}
          >
            <div className="profile-image-wrapper">
              <img
                src={`${_HIT_ORIGINE}profile-images/${item.img}`}
                alt=""
                className="profile-img"
              />
              {manageProfile && (
                <div className="manage-profile-image-overlay-btn">
                  <Icon.PenDuoTone />
                </div>
              )}
            </div>
            <p className="profile-name">{item.name}</p>
          </li>
        ))}
        {manageProfile && profiles?.length < 5 && (
          <button
            onClick={() => {
              popupOpen();
              onChangePopupData({});
            }}
            className="bg-transparent"
          >
            <div className="profile-add-placeholder">
              <i className="fa-solid fa-plus fx-2"></i>
            </div>
            <p className="pt-10 fw-bold">Add Profile</p>
          </button>
        )}
      </ul>
      {manageProfile && (
        <UserPopup
          popup={popup}
          popupData={popupData}
          popupOpen={popupOpen}
          popupClose={popupClose}
          manageProfile={manageProfile}
          onChangePopupData={onChangePopupData}
        />
      )}
    </>
  );
};

export default UsersProfiles;
