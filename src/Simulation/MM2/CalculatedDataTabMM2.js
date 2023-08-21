import React from "react";

const CalculatedDataTabMM2 = ({ calculatedData, randomData }) => {
  return (
    <div className="overflow-auto">
      <h2 className="text-center text-3xl  font-bold ">Calculated Data</h2>

      <div className="grid grid-cols-1 gap-8 ">
        <div>
          <h3 className="text-2xl text-center  font-bold mb-4 mt-8">
            Server 1
          </h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-xl">Customer</th>
                {/* <th className="text-xl">Interarrival</th>
                <th className="text-xl">Arrival Time</th>
                <th className="text-xl">Service Time</th> */}
                <th className="text-xl">Start Time</th>
                <th className="text-xl">End Time</th>
                <th className="text-xl">Wait Time</th>
                <th className="text-xl">Turnaround Time</th>
                <th className="text-xl">Response Time</th>
              </tr>
            </thead>
            <tbody>
              {calculatedData.server1Data.map((data, index) => (
                <tr key={data.starttime}>
                  <td className="text-center pt-4/ font-bold">
                    {data.customer}
                  </td>
                  {/* <td className="text-center pt-4/ font-bold">
                    {randomData[index].interarrivalTime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {randomData[index].arrivalTime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {randomData[index].serviceTime}
                  </td> */}
                  <td className="text-center pt-4/ font-bold">
                    {data.starttime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {data.endtime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {data.waitTime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {data.turnaroundTime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {data.responseTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="text-2xl text-center    font-bold mb-4">Server 2</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-xl">Customer</th>
                <th className="text-xl">Start Time</th>
                <th className="text-xl">End Time</th>
                <th className="text-xl">Wait Time</th>
                <th className="text-xl">Turnaround Time</th>
                <th className="text-xl">Response Time</th>
              </tr>
            </thead>
            <tbody>
              {calculatedData.server2Data.map((data) => (
                <tr key={data.starttime}>
                  <td className="text-center pt-4/ font-bold">
                    {data.customer}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {data.starttime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {data.endtime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {data.waitTime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {data.turnaroundTime}
                  </td>
                  <td className="text-center pt-4/ font-bold">
                    {data.responseTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 my-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center ">
            Server Idle Time
          </h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-xl">Server</th>
                <th className="text-xl">Idle Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center pt-4/ font-bold">Server 1</td>
                <td className="text-center pt-4/ font-bold">
                  {calculatedData.server1IdlePercentage}%
                </td>
              </tr>
              <tr>
                <td className="text-center pt-4/ font-bold">Server 2</td>
                <td className="text-center pt-4/ font-bold">
                  {calculatedData.server2IdlePercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center ">
            Server Utilization Time
          </h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-xl">Server</th>
                <th className="text-xl">Utilization Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center pt-4/ font-bold">Server 1</td>
                <td className="text-center pt-4/ font-bold">
                  {calculatedData.server1UtilizationPercentage}%
                </td>
              </tr>
              <tr>
                <td className="text-center pt-4/ font-bold">Server 2</td>
                <td className="text-center pt-4/ font-bold">
                  {calculatedData.server2UtilizationPercentage}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4 text-center ">
          System Idle and Utilization Time
        </h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xl">System</th>
              <th className="text-xl">Idle Time</th>
              <th className="text-xl">Utilization Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center pt-4/ font-bold">System</td>
              <td className="text-center pt-4/ font-bold">
                {calculatedData.systemIdlePercentage}%
              </td>
              <td className="text-center pt-4/ font-bold">
                {calculatedData.systemUtilizationPercentage}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalculatedDataTabMM2;
