'use client';

import React from 'react';
import {Sidebar} from "@/components/Sidebar";


export default function Dashboard() {
    return (
        <div className={'flex row'}>
            <Sidebar/>
            <div className={'w-full flex flex-col m-4 ml-0 bg-white rounded-3xl  liquid-glass transition-[width] duration-500 h-[calc(100vh-2rem)]'}>

            </div>
        </div>
        
    );
}