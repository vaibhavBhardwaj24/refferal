import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
interface Course {
  id: number;
  name: string;
  referrerBonus: number;
  referreeBonus: number;
}
const Refer = () => {
  const [programs, setPrograms] = useState<Course[]>();
  const [selectedProgram, setSelectedProgram] = useState("");
  const [email, setEmail] = useState("");
  const [referralLoad, setReferralLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const user = Cookies.get("token");
    if (!user) {
      navigate("/register");
    }
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/course");

        setPrograms(response.data);
        setLoading(false);
      } catch (err) {
        toast.error("Something went wrong");
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setReferralLoad(true);
    const user = Cookies.get("token");
    const id = JSON.parse(user!);
    console.log(id);

    const data = await axios.post("http://localhost:5000/referral", {
      programId: Number(selectedProgram),
      userId: id.id,
      refEmail: email,
    });
    console.log(data);

    if (data.status == 201) {
      toast.success("Referral sent");
      navigate("/");
    } else {
      toast.error("Something went wrong");
    }
    setReferralLoad(false);
    // console.log("Submitted:", { programId: selectedProgram, email });
    // Add your form submission logic here
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-blue-600">Loading programs...</div>
      </div>
    );
  }
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Referral Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="program"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Program
          </label>
          <select
            id="program"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Choose a program</option>
            {programs!.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name} (Bonus: ₹{program.referreeBonus})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
        >
          {referralLoad ? "Loading" : "Submit Referral"}
        </button>
      </form>
    </div>
  );
};

export default Refer;
