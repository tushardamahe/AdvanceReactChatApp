import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";
import { useState } from "react";

const Detail = () => {
  const [iconStates, setIconStates] = useState({
    chatSettings: false,
    privacyHelp: false,
    sharedPhotos: false,
    sharedFiles: false,
  });

  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
  } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleIconState = (iconName) => {
    setIconStates((prev) => ({
      ...prev,
      [iconName]: !prev[iconName],
    }));
  };

  const handleLogout = () => {
    auth.signOut();
    resetChat();
  };
  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Web Developer</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img
              src={
                iconStates.chatSettings ? "./arrowUp.png" : "./arrowDown.png"
              }
              alt=""
              onClick={() => toggleIconState("chatSettings")}
            />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img
              src={iconStates.privacyHelp ? "./arrowUp.png" : "./arrowDown.png"}
              alt=""
              onClick={() => toggleIconState("privacyHelp")}
            />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img
              src={
                iconStates.sharedPhotos ? "./arrowUp.png" : "./arrowDown.png"
              }
              alt=""
              onClick={() => toggleIconState("sharedPhotos")}
            />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://scitechdaily.com/images/Black-Hole-Event-Horizon-Artistic-Illustration-777x518.jpg"
                  alt=""
                />
                <span>photo_2024_1.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img
                  src="https://cdn.britannica.com/57/181857-050-972A4F96/Artist-rendering-matter-black-hole.jpg"
                  alt=""
                />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img
              src={iconStates.sharedFiles ? "./arrowUp.png" : "./arrowDown.png"}
              alt=""
              onClick={() => toggleIconState("sharedFiles")}
            />
          </div>
        </div>
        <button onClick={handleBlock}>
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={() => auth.signOut()}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Detail;
