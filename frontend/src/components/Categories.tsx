import React, { useEffect, useRef, useState } from 'react';
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Transition } from "@headlessui/react";


import { message } from 'antd';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { motion } from 'framer-motion';
import {LampContainer} from "./ui/lamp";

interface Category {
    _id: string;
    date: string;
    time: string;
    name: string;
    content: string;
    author: string;
}

function Categories() {


    return (
       <div className="h-full">


       </div>
    );
}

export default Categories;
