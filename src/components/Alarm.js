import React, { useEffect, useState } from 'react';
import 'boxicons'

const Alarm = () => {
    const [currentTime, setCurrentTime] = useState('00:00:00')
    const [hour, setHour] = useState(null)
    const [min, setMin] = useState(null)
    const [id, setId] = useState(1)

    const [audio, setAudio] = useState(new Audio('./alarm.mp3'))

    const [alarms, setAlarms] = useState([])
    const [playing, setPlaying] = useState(false)

    useEffect(() => {
        const interval = setInterval(updateAlert, 1000)

        return () => clearInterval(interval);
    }, [currentTime])

    const updateAlert = () => {
        let alarmsNow = alarms

        alarmsNow.forEach((alarm) => {
            if ((alarm.on && alarm.time === currentTime.slice(0, 5)) || alarm.playing === true) {
                
                alarm.playing = true
                if (!playing) {
                    setPlaying(true)
                    audio.play()
                    
                    
                }
            }
        })


        if (!(alarms===alarmsNow)) {
            setAlarms(alarmsNow)
        }
       
        displayTimer();
        
    }

    const displayTimer = () => {
        const date = new Date();
        const currentTime = date.toLocaleTimeString("en-US", { hour12: false });
        setCurrentTime(currentTime)
    }

    const appendZero = (value) => (value < 10 ? "0" + value : value);

    const addAlarm = () => {
        setAlarms([...alarms, {
            id: id,
            on: true,
            playing: false,
            time: `${appendZero(hour)}:${appendZero(min)}`
        }])
        setId(id+1)
    }

    const clearAlarm = () => {
        setAlarms([])
    }

    const setOn = (id) => {
        alarms.map((alarm) => {
            if (alarm.id === id) {
                alarm.on = !alarm.on
                if (alarm.playing === true) {
                    alarm.playing = false
                    setPlaying(false);
                }
            }
        })
        
        setAlarms([...alarms])
    }

    const deleteAlert = (id) => {
        
        
        setPlaying(false)
        audio.pause()
        setAlarms([...alarms.filter(item => item.id !== id)])
    }



    return (
        <div className='container w-1/2 h-auto min-h-96 bg-slate-800 rounded-md flex flex-col justify-center items-center p-5 pt-10'>
            <div className='text-white font-bold text-4xl'>{currentTime}</div>
            <div className='inputs mt-5'>
                <input type='number' className='mr-7' placeholder='00' min={0} max={23}
                value={hour}
                onChange={(e) => setHour(e.target.value)}></input>
                <input type='number' placeholder='00' min={0} max={59}
                value={min}
                onChange={(e) => setMin(e.target.value)}></input>
            </div>
            <div className='buttons w-2/3'>
                <button type='number' className='mr-2' placeholder='00' min={0} max={23} onClick={addAlarm}>Add</button>
                <button type='number' placeholder='00' min={0} max={59} onClick={clearAlarm}>Clear</button>
            </div>

            <div className='flex flex-col justify-between items-center w-full mt-10 bg-slate-950 rounded-md gap-2'>
                    {alarms.map((alarm) => 
                        <div className='flex justify-between items-center w-full border-dashed border-2 p-5'>
                            <span className='text-white text-xl'>{alarm.time}</span>
                            <div className='flex gap-5'>
                              <button onClick={(e) => setOn(alarm.id)}><box-icon name={alarm.on ? 'toggle-right' : 'toggle-left'} type={alarm.on ? 'solid' : 'regular'} color='white' size='2rem'></box-icon></button>
                              <button onClick={(e) => deleteAlert(alarm.id)}> <box-icon type='solid' name='trash-alt' color='white' size='2rem'></box-icon></button>
                            </div>
                        </div>
                    )}
            </div>

        </div>
    );
};

export default Alarm;