import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { getChatsFailure, getChatsStart, getChatsSuccess } from "./chatSlice";

const DB_REF = collection(db, "chats");

export const fetchChats = async (dispatch) => {
  dispatch(getChatsStart());
  try {
    const res = await getDocs(DB_REF);
    console.log(res);
    dispatch(
      getChatsSuccess(res.docs.map((doc) => ({ ...doc.data(), id: doc.id,  })))
    );
  } catch (err) {
    dispatch(getChatsFailure());
    alert(err);
  }
};