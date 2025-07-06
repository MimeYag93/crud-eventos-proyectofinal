import { useState } from "react";
import { enrollInEvent } from "../api/enrollment";
import { useUser } from "../../context/UserContext";

type Props = {
  eventId: string;
};

export const EnrollButton = ({ eventId }: Props) => {
  const { user } = useUser();
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = async () => {
    if (!user) return alert("Debes iniciar sesión para inscribirte");
    await enrollInEvent(eventId, user.email);
    setEnrolled(true);
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={enrolled}
      className={`p-2 rounded ${enrolled ? "bg-gray-400" : "bg-green-600 text-white hover:bg-green-700"}`}
    >
      {enrolled ? "Inscrito" : "Inscribirse"}
    </button>
  );
};