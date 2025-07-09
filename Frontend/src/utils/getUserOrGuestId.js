import { v4 as uuidv4 } from "uuid";

export const getUserOrGuestId = () => {
    const guestId = localStorage.getItem("guestId") || createGuestId();
    const userId = localStorage.getItem("userId");

    return { userId, guestId };
};

function createGuestId() {
    const guestId = uuidv4();
    localStorage.setItem("guestId", guestId);
    return guestId;
}
