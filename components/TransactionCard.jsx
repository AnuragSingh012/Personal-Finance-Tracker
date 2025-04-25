import React from 'react'
import Image from 'next/image'

const TransactionCard = () => {
  return (
    <div className='flex flex-wrap justify-evenly gap-6'>
        <div className='flex flex-1 flex-col px-6 py-6 bg-[#0b100e] text-white rounded-2xl'>
            <div className='flex items-center gap-30 justify-between'>
                <p className='text-2xl font-medium'>Remaining</p>
                <Image src="" alt='img' width={40} height={40}></Image>
            </div>
            <p className='text-lg font-light'>Apr 04 - May 04, 2024</p>
            <p className='text-3xl font-bold'>$144928</p>
        </div>
        <div className='flex flex-1 flex-col px-6 py-6 bg-[#0b100e] text-white rounded-2xl'>
            <div className='flex items-center gap-30 justify-between'>
                <p className='text-2xl font-medium'>Income</p>
                <Image src="" alt='img' width={40} height={40}></Image>
            </div>
            <p className='text-lg font-light'>Apr 04 - May 04, 2024</p>
            <p className='text-3xl font-bold'>$144928</p>
        </div>
        <div className='flex flex-1 flex-col px-6 py-6 bg-[#0b100e] text-white rounded-2xl'>
            <div className='flex items-center gap-30 justify-between'>
                <p className='text-2xl font-medium'>Expenses</p>
                <Image src="" alt='img' width={40} height={40}></Image>
            </div>
            <p className='text-lg font-light'>Apr 04 - May 04, 2024</p>
            <p className='text-3xl font-bold'>$144928</p>
        </div>
    </div>
  )
}

export default TransactionCard