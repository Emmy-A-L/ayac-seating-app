import { useState } from "react";
import type { YouthData } from "../utils/types";
import axios from "axios";

const VerificationForm = () => {
  const [youthInfo, setYouthInfo] = useState<YouthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const api = import.meta.env.VITE_API_URL;

  const findYouth = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    try {
      setLoading(true);
      setError(null); // reset error
      setVisible(false); // hide old info
      const res = await axios.get(
        `${api}youthinfo/getyouthinfobyname/${youthInfo?.fullName}`
      );

      if (res.status === 200 && res.data.data[0]) {
        setYouthInfo(res.data.data[0]);
        console.log("response: ", res.data.data);
      } else {
        setError(
          "Couldn't find the name entered. Confirm name arrangement and try again!"
        );
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong while verifying. Please try again.");
    } finally {
      setLoading(false);
      setVisible(true); // show new info
    }
  };

  return (
    <div className="absolute bottom-8 left-4 right-4">
      {visible && (
        <div className="w-full flex flex-col bg-gray-800/10 p-3 border-gray-600 backdrop-filter backdrop-blur-sm border text-right mb-20 rounded-3xl rounded-br-none z-10 gap-4">
          <span>{youthInfo?.fullName}</span>
          <span>{youthInfo?.register === true ? "Registered!" : null}</span>
          <span>
            {youthInfo?.transportInfo === "none"
              ? "Did not pay transportation fee."
              : youthInfo?.transportInfo}
          </span>
        </div>
      )}

      {error && (
        <div className="w-full flex flex-col bg-red-500/10 p-3 border-red-600 backdrop-filter backdrop-blur-sm border text-right mb-10 rounded-3xl rounded-br-none z-10 gap-4">
          <span className="text-red-500">{error}</span>
        </div>
      )}

      <form onSubmit={findYouth}>
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Full Name"
            value={youthInfo?.fullName || ""}
            onChange={(e) =>
              setYouthInfo({ fullName: e.target.value })
            }
            className="border p-2 rounded-l-lg basis-4/5 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white border p-2 rounded-r-lg basis-1/5"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
