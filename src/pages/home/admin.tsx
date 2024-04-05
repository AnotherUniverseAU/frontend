import { useEffect, useState } from "react";
import { apiRequestGet } from "src/apis/apiRequestGet";

export const Admin = () => {
  const [tomorrowMessage, setTommorowMessage] = useState<string>("");

  useEffect(() => {
    const fetchTomorrowMessage = async () => {
      const result = await apiRequestGet("/admin/tomorrow-message");
      setTommorowMessage(result.tomorrowMessage);
    };

    fetchTomorrowMessage();
  }, []);

  return (
    <>
      <div>내일 보낼 메시지</div>
      <br />
      <br />
      {tomorrowMessage}
    </>
  );
};
