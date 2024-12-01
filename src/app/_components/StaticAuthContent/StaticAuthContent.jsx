import Image  from 'next/image';


export default function StaticAuthContent() {
    return (
        <div className='bg-[#F0F4FC] rounded-tr-[100px] rounded-br-[100px] flex justify-center items-center py-10 shadow-lg'>
            <div className="content w-4/5 lg:pe-40">
                <h1 className='font-bold text-[40px] lg:text-[50px] leading-relaxed'>
                    Welcome to <br />
                    <span className='text-[50px] lg:text-[60px] text-[#122D9C]'>Elevate</span>
                </h1>
                <p className='text-lg leading-10'>Quidem autem voluptatibus qui quaerat aspernatur architecto natus</p>
                <Image width={408} height={434.59} src={'/bro.png'} alt={"bro.png"} />
            </div>
        </div>
    )
}
