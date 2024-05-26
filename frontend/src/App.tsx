import React, { useEffect, useRef, useState } from 'react';
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import './App.css';
import axios from "axios";
import { Transition } from "@headlessui/react";
import { message } from 'antd';

import { Link, useNavigate, useParams } from 'react-router-dom';
import {BackgroundGradientAnimation} from "./components/ui/background-gradient-animation";

import Categories from "./components/Categories";
import Editor from "./components/editor/Editor";

interface Note {
  _id: string;
  date: string;
  time: string;
  name: string;
  content: string;
  author: string;
}

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const today: string = Date().toString();
  const [date, setDate] = useState<string>(today);
  const [time, setTime] = useState<string>('3.00');
  const [name, setName] = useState<string>('Papaya');
  const [content, setContent] = useState<string>('Testing 1');
  const [author, setAuthor] = useState<string>('Bimidu');
  const { id } = useParams<{ id: string }>();
  const [notes, setNotes] = useState<Note[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<Note | null>(null);
  const [showPopover, setShowPopover] = useState<boolean>(false);

  const handleItemClick = (record: Note) => {
    setSelectedItem(record);
  };


  const handleScroll = () => {
    if ('vibrate' in navigator) {
      window.navigator.vibrate(500);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
        .get('http://localhost:5555/notes')
        .then((response) => {
          setNotes(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
  }, []);

  const handleCreateNote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Saving note...');
    const data = {
      date,
      time,
      name,
      content,
      author,
    };

    setLoading(true);
    try {
      await axios.post('http://localhost:5555/notes', data);
      setLoading(false);
      message.success('Note has successfully saved.');
      //setNotes((prevNotes) => [...prevNotes, data]);
    } catch (error) {
      setLoading(false);
      message.error('Note saving failed.');
      console.error(error);
    }
  };

  return (
      <BackgroundGradientAnimation>
          <div className="absolute inset-0 z-50  flex flex-row w-screen bg-[#EBE9E1] bg-opacity-30">

              <div>
                  <div className={`my-8 h-[calc(100vh-4rem)] w-16 font-bold ml-6 text-2xl  
                hover:rounded-l-2xl transition-all duration-200 text-gray-700 justify-center 
                items-center flex flex-col ${showPopover ? 'filter blur-lg' : ''}`}>

                      <div className=" w-fit ">
                          <button
                              className="size-6 rounded-full bg-red-300 flex justify-center align-middle mb-8"></button>
                          <ul>
                              <li className="mb-16 flex py-4 rounded-full justify-center">
                                  <button
                                      className="[writing-mode:vertical-lr] rotate-180 hover:underline "
                                  >
                                      NOTES
                                  </button>
                              </li>
                              <li className="mb-16 flex py-4 rounded-full justify-center">
                                  <button
                                      onClick={() => setShowPopover(!showPopover)}
                                      className="[writing-mode:vertical-lr] rotate-180 hover:underline  transition-all duration-100"
                                  >
                                      CATEGORIES
                                  </button>
                              </li>
                              <li className="mb-16 flex py-4 rounded-full justify-center">
                                  <button
                                      className="[writing-mode:vertical-lr] rotate-180 hover:underline transition-all duration-500">
                                      SETTINGS
                                  </button>
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>

              <div
                  className={`flex flex-row w-1/4  border-x border-black py-8 ${showPopover ? 'filter blur-lg' : ''}`}>
                  <div
                      className="  overflow-y-scroll w-full  font-semibold  h-full text-black justify-start items-start flex flex-col">
                      <div className="w-full h-fit p-3 flex justify-end items-start align-top ">
                          <button
                              onClick={handleCreateNote}
                              className=" size-6 rounded-full bg-black hover:bg-gray-700 flex justify-center items-center align-middle "
                          >
                              <PlusIcon className="text-[#EBE9E1] size-5"/>
                          </button>
                      </div>

                      <div
                          className="notelist  w-full h-[calc(100vh-7rem)] overflow-scroll overscroll-auto divide-black divide-y"
                          ref={listRef}
                          onScroll={handleScroll}
                      >
                          {notes.map((record, index) => (
                              <div
                                  key={record._id}
                                  className={`py-2 px-4 hover:bg-black hover:text-gray-100 hover:py-6  transition-all duration-75 ${
                                      selectedItem === record ? 'bg-black  text-gray-100' : ''
                                  }`}
                                  onClick={() => handleItemClick(record)}
                              >
                                  <div className="text-sm font-medium">{record.name}</div>
                                  <div className="text-xs font-light">{record.content}</div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              <Transition
                  show={showPopover}
                  as={React.Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
              >
                  <div className="fixed inset-0 flex  items-center justify-center z-20">
                      <div className="bg-[#CCE0DA] w-3/4 h-3/4  border-2 border-black p-8 rounded-xl shadow-xl">
                          <div className="flex justify-between flex-row">
                              <h3 className="font-medium text-xl">Categories</h3>
                              <div className="flex justify-between  items-center mb-4">
                                  <button onClick={() => setShowPopover(false)}
                                          className="size-6 rounded-full bg-black hover:bg-gray-700 flex justify-center items-center align-middle">
                                      <XMarkIcon className="text-[#EBE9E1] size-5"/>
                                  </button>
                              </div>

                          </div>
                          <div className="">
                              <Categories />
                          </div>

                      </div>
                  </div>
              </Transition>


              <div className={`flex transition-all duration-300 w-full ${showPopover ? 'filter blur-lg' : ''} `}>


                  <div className="  my-8 w-full ">
                    <Editor/>
                  </div>
              </div>

          </div>
      </BackgroundGradientAnimation>


  );
}

export default App;
