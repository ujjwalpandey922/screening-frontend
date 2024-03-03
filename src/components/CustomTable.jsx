"use client";
import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { BsClockHistory } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { FaStar } from "react-icons/fa";

function CustomTable() {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          "https://gist.githubusercontent.com/telematum/7751eec667033ac8acd244542e464e18/raw/d4710c6fb54224a0bd316ecdc5246633aceefce5/todays.json"
        );
        const { appointments } = await data.json();
        setInfo(appointments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  function getRandomColor() {
    const r = Math.floor(Math.random() * 156) + 100;
    const g = Math.floor(Math.random() * 156) + 100;
    const b = Math.floor(Math.random() * 156) + 100;
    return `rgb(${r}, ${g}, ${b})`;
  }
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-gray-400 font-bold w-full sm:px-6 lg:px-8">
        Today&apos;s Appointment List
      </h1>
      <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  PATIENTS
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  DATE
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  TIME
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  DOCTOR
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  INJURY
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {info?.map((person, index) => {
                // Convert the date string to a Date object
                const appointmentDate = new Date(person.appointment_date);

                // Format the date using toLocaleString with custom options
                const formattedDate = appointmentDate.toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div
                          className="flex-shrink-0  font-bold rounded-full text-center text-xl grid place-content-center h-10 w-10"
                          style={{ backgroundColor: getRandomColor() }}
                        >
                          {person?.patient_name.slice(0, 1)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {person?.patient_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {person.mobile_number}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4  ">
                      <div className="flex gap-2 justify-left  items-center  whitespace-nowrap">
                        <MdOutlineDateRange className="text-xl" />
                        <span>{formattedDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-left  items-center  whitespace-nowrap">
                        <BsClockHistory className="text-xl" />
                        <span>{person.appointment_time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 ">
                      {" "}
                      <div className="flex gap-2 justify-left  items-center  whitespace-nowrap">
                        <FaStar
                          className={
                            "rounded-full text-xl text-white p-1" +
                            (index === 3 || index === 4
                              ? " bg-orange-500"
                              : " bg-green-500")
                          }
                        />
                        <span> {person.doctor}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {" "}
                      <span
                        className="px-2 py-1 inline-flex text-xs leading-5
                      font-semibold rounded-md bg-blue-100 text-sky-800"
                      >
                        {person.injury}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <HiOutlineDotsVertical />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default CustomTable;
