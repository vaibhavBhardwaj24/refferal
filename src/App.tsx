import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import ""
interface Course {
  id: number;
  name: string;
  referrerBonus: number;
  referreeBonus: number;
}
function App() {
  const [programs, setPrograms] = useState<Course[]>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_PUBLIC_BACKEND_URL;
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${URL}/course`);

        setPrograms(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[200px]">
  //       <div className="text-blue-600">Loading programs...</div>
  //     </div>
  //   );
  // }

  return (
    <>
      <section>
        <div className="bg-[#1A73E826] flex gap-3 justify-center py-3">
          Navigate your ideal career path with tailored expert advice
          <p className="text-[#1A73E8]">Contact Expert</p>
        </div>
        <div className="flex justify-around items-center p-3">
          <img src="../src/assets/logo.svg" alt="" />
          <div className="flex gap-5 items-center">
            <p>Refer & Earn</p>
            <p>Resources</p>
            <p>About Us</p>
            <button
              className="bg-[#1A73E8] p-2 rounded-md text-white"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#1A73E826] flex rounded-full gap-8 p-5 text-xl">
            <p className="hover:text-blue-800 cursor-pointer">Refer</p>
            <p>Benefits</p>
            <p>FAQs</p>
            <p>Support</p>
          </div>
        </div>
        <div className="flex  justify-center pt-5">
          <div className="bg-[#1A73E826] p-4 flex-row w-3/4 justify-around items-center rounded-xl shadow-xl flex">
            <div className="text-7xl font-bold ">
              Let’s Learn <br /> & Earn
              <p className="text-4xl font-medium">
                Get a chance to win <br /> up-to
                <p className="text-6xl text-blue-800">Rs. 15,000</p>
              </p>
            </div>
            <img
              src="../src/assets/main.png"
              alt=""
              className="w-1/2 hidden md:block translate-y-10"
            />
          </div>
        </div>
      </section>
      <section className="flex justify-center my-9 hfi w-full">
        <div className="flex  flex-col text-3xl p-2 font-semibold bg-[#1a73e815] w-full items-center h-1/2">
          <p className="flex gap-1">
            How do I <p className="text-blue-800">Refer?</p>
          </p>
          <img src="../src/assets/image.png" alt="" className="w-1/2" />
          <button
            className="bg-blue-600 p-2 rounded-md text-xl font-medium text-white"
            onClick={() => {
              navigate("/refer");
            }}
          >
            Refer Now
          </button>
        </div>
      </section>
      <section className="">
        <div className="items-center gap-10 m-12 flex-col flex">
          <p className="flex gap-1 text-3xl font-semibold">
            What are The <p className="text-blue-800">Referral Benefits?</p>
          </p>
          {loading ? (
            <>loading</>
          ) : (
            <div className="overflow-x-auto w-1/2 bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                      Program Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                      Referree Bonus
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-blue-900">
                      Referrer Bonus
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {programs!.map((program) => (
                    <tr
                      key={program.id}
                      className="hover:bg-blue-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {program.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ₹{program.referreeBonus}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        ₹{program.referrerBonus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            className="bg-blue-600 p-2 rounded-md text-xl font-medium text-white"
            onClick={() => {
              navigate("/refer");
            }}
          >
            Refer Now
          </button>
        </div>
      </section>
      <section>
        <div className="w-full gap-10 my-10 flex flex-col items-center">
          <p className="flex gap-1 text-3xl font-semibold">
            Frequently Asked <p className="text-blue-800">Questions</p>
          </p>
          <p className="gap-2">
            <p className="text-blue-800 text-lg font-semibold">
              Do I need to have prior Product Management and Project Management
              experience to enroll in the program?
            </p>
            <p>
              No, the program is designed to be inclusive of all levels of
              experience. All topics will be covered from the basics, making it{" "}
              <br />
              suitable for individuals from any field of work.
            </p>
          </p>
        </div>
      </section>
      <section>
        <div className="bg-[#282828] pb-40 pt-8 px-60 gap-4 flex flex-col text-white ">
          <div className="w-full flex">
            <img
              src="../src/assets/accredainnew.svg"
              alt=""
              className="h-1/2 "
            />
          </div>
          <hr />
          <p className="text-xl">Contact Us</p>
          <div>
            <p>Email us (For Data Science Queries): admissions@accredian.com</p>
            <p>Email us (For Product Management Queries):pm@accredian.com</p>
            <p>Data Science Admission Helpline:+91 9079653292 (9 AM - 7 PM)</p>
            <p>Product Management Admission Helpline:+91 9625811095</p>
            <p>Enrolled Student Helpline: +91 7969322507</p>
            <p>
              Office Address: 4th Floor, 250, Phase IV, Udyog Vihar, Sector 18,
              Gurugram, Haryana 122015
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
