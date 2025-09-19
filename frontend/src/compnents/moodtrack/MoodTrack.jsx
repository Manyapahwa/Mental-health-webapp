import React,{useState,useEffect} from "react";
import Navbar from "../navbar/Navbar";
import {Dialog,Transition} from '@headlessui/react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axios from 'axios';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


const MoodTrack=()=>{
    const [selectedDate,setSelectedDate]=useState(null);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [mood,setMood]=useState(null);
    const [moodData, setMoodData] = useState([]);

     const username = localStorage.getItem('tokenUser');
  console.log(username);

  useEffect(() => {
    // Fetch existing mood data for the user
    axios.get(`http://localhost:4000/api/moods/${username}`)
      .then(response => setMoodData(response.data))
      .catch(error => console.error('Error fetching mood data:', error));
  }, [username]);

    const moodLabels = ['😄', '😊', '😐', '😔', '😢'];
    const moodCounts = moodLabels.map(label => moodData.filter(entry => entry.mood === label).length);

  const data = {
    labels: moodLabels,
      datasets: [
        {
        label: 'Mood Frequency',
        data: moodCounts,
        backgroundColor: 'rgba(42, 114, 161, 0.54)',
        borderWidth: 1,
      },
    ],
  };


    const handleDateChange=(event)=>{
        setSelectedDate(event.target.value);
        setIsModalOpen(true);
    };

    const handleMoodSelect=(emoji)=>{
        setMood(emoji);
        axios.post(`http://localhost:4000/api/moods/${username}`,{date:selectedDate,mood:emoji})
        .then(response=> {
             setMoodData(prevData => [...prevData,response.data]);
             setIsModalOpen(false);
        })
        .catch(error => console.error('Error saving mood:',error));


    };

    return(
        <div>
            <Navbar/>
            <div className="pt-5">
            <div className=" w-3/4 py-6 px-20 overflow-hidden mx-auto bg-blue-200 border border-gray-800 rounded-lg">
             
             <div className=" bg-white w-full p-6 border rounded-lg">
             <div className="text-center ">
             <input 
                type="date"
                onChange={handleDateChange}
                className="w-full border p-2 pb-4 border-gray-300 bg-gray-200 rounded-lg"
             />
             </div>

             <Transition appear show={isModalOpen} as={React.Fragment}>
                <Dialog as="div" className="relative z-10"  onClose={()=> setIsModalOpen(false)}>

                <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                {/* //it will give the balckish effect to the background with opacity -25 inset-0 means no spacing */}
                <div className="fixed bg-black opacity-25 inset-0" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center text-center min-h-full p-4">

                        <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95">

                            <Dialog.Panel className="w-full min-w-[400px] max-w-lg bg-white rounded-2xl transform overflow-hidden p-6 text-left align-middle transition-all ">

                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                How do you feel Today?
                            </Dialog.Title>

                            <div className="mt-4 flex justify-around">
                            {moodLabels.map((emoji,index)=>(

                                <button
                                key={index}
                                className="text-2xl transition duration-300 ease-in-out transform hover:scale-90"
                                onClick={()=> handleMoodSelect(emoji)}>
                                {emoji}
                                </button>

                            ))}
                             </div>
                              </Dialog.Panel>


                        </Transition.Child>
                    </div>
                </div>

                </Dialog>
             </Transition>
             </div>





             <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Mood Frequency</h2>
          </div>
          <div className="mt-6 h-96">
            <Bar data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>


            </div>

            </div>
            
        </div>

    );

};

export default MoodTrack;