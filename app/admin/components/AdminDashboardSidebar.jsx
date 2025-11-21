import React from 'react'
import Image from 'next/image'
import AdminDashboardNavLink from '../components/AdminDashboardNavLink'

function AdminDashboardSidebar({ collapsed, setCollapsed }) {
    return (
        <>
            <div className={`z-[2] border-r border-[#F7F8F81A] md:backdrop-blur-[0px] backdrop-blur-[100px] md:bg-[#F7F8F80A] dark:text-[#F7F8F8B2] h-full transition-all duration-500 md:duration-300 md:relative md:top-auto md:left-auto md:bottom-auto top-0 bottom-0 left-0 fixed md:translate-x-0
                ${collapsed ? "w-[80px] -translate-x-[280px]" : "w-[280px] translate-x-0"}`}>
                <div className='px-[10px]'>
                    <div className='h-[60px] border-[#F7F8F81C] border-b p-[10px] flex items-center justify-center relative'>
                        {collapsed ? (
                            <Image src="/icons/cookie.png"
                                alt="Logo"
                                width={500}
                                height={500}
                                className='w-[50px] md:block hidden' />
                        ) : (
                            <Image src="/img/header-logo.png"
                                alt="Logo"
                                width={500}
                                height={500}
                                className='w-[100px] md:block hidden' />
                        )}
                        <Image src="/img/header-logo.png"
                            alt="Logo"
                            width={500}
                            height={500}
                            className='w-[120px] md:hidden block' />
                        <div>
                            <div
                                className='md:hidden block absolute top-[8px] right-[8px]'
                                onClick={() => setCollapsed(!collapsed)}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 329.269 329"
                                    className="fill-[#F7F8F8] w-[15px]"
                                >
                                    <path
                                        d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-between h-[calc(100vh-60px)]'>
                    <div className='pt-[30px] h-[calc(100vh-140px)] duration-300 pl-[10px]'>
                        <nav className='space-y-[10px] h-[calc(100vh-170px)] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#F7F8F81C] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-[#F7F8F830]'>
                            <AdminDashboardNavLink href="/admin/dashboard" collapsed={collapsed} setCollapsed={setCollapsed}>
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className='min-w-[20px] min-h-[20px] max-h-[20px] max-w-[20px] object-contain'>
                                    <path d="M11.5 0C5.15671 0 0 5.16171 0 11.5082C0 17.8546 5.15671 23 11.5 23C17.8433 23 23 17.8546 23 11.5082C23 5.16171 17.8433 0 11.5 0ZM11.5 1.04545C17.2784 1.04545 21.9464 5.72683 21.9464 11.5082C21.9464 17.2895 17.2784 21.9627 11.5 21.9627C5.72157 21.9627 1.04545 17.2895 1.04545 11.5082C1.04545 5.72683 5.72157 1.04545 11.5 1.04545ZM11.5 4.44318C9.48531 4.44318 7.84091 6.0864 7.84091 8.10227C7.84091 10.1181 9.48531 11.7695 11.5 11.7695C13.5147 11.7695 15.1591 10.1181 15.1591 8.10227C15.1591 6.0864 13.5147 4.44318 11.5 4.44318ZM11.5 5.48864C12.9497 5.48864 14.1136 6.65173 14.1136 8.10227C14.1136 9.55279 12.9497 10.7241 11.5 10.7241C10.0503 10.7241 8.88636 9.55279 8.88636 8.10227C8.88636 6.65173 10.0503 5.48864 11.5 5.48864ZM11.5 12.0227C7.89929 12.0227 4.96591 14.9488 4.96591 18.5568H6.01136C6.01136 15.5148 8.46405 13.0682 11.5 13.0682C14.5359 13.0682 16.9805 15.5148 16.9805 18.5568H18.0341C18.0341 14.9488 15.1007 12.0227 11.5 12.0227Z" 
                                    className='fill-white group-hover:fill-black group-[.text-black]:fill-black'/>
                                </svg>
                                Admin Dashboard
                            </AdminDashboardNavLink>
                            <AdminDashboardNavLink href="/admin/products" collapsed={collapsed} setCollapsed={setCollapsed}>
                                
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className='min-w-[20px] min-h-[20px] max-h-[20px] max-w-[20px] object-contain'>
                                    <path d="M11.5 0C5.15671 0 0 5.16171 0 11.5082C0 17.8546 5.15671 23 11.5 23C17.8433 23 23 17.8546 23 11.5082C23 5.16171 17.8433 0 11.5 0ZM11.5 1.04545C17.2784 1.04545 21.9464 5.72683 21.9464 11.5082C21.9464 17.2895 17.2784 21.9627 11.5 21.9627C5.72157 21.9627 1.04545 17.2895 1.04545 11.5082C1.04545 5.72683 5.72157 1.04545 11.5 1.04545ZM11.5 4.44318C9.48531 4.44318 7.84091 6.0864 7.84091 8.10227C7.84091 10.1181 9.48531 11.7695 11.5 11.7695C13.5147 11.7695 15.1591 10.1181 15.1591 8.10227C15.1591 6.0864 13.5147 4.44318 11.5 4.44318ZM11.5 5.48864C12.9497 5.48864 14.1136 6.65173 14.1136 8.10227C14.1136 9.55279 12.9497 10.7241 11.5 10.7241C10.0503 10.7241 8.88636 9.55279 8.88636 8.10227C8.88636 6.65173 10.0503 5.48864 11.5 5.48864ZM11.5 12.0227C7.89929 12.0227 4.96591 14.9488 4.96591 18.5568H6.01136C6.01136 15.5148 8.46405 13.0682 11.5 13.0682C14.5359 13.0682 16.9805 15.5148 16.9805 18.5568H18.0341C18.0341 14.9488 15.1007 12.0227 11.5 12.0227Z" 
                                     className='fill-white group-hover:fill-black group-[.text-black]:fill-black' />
                                </svg>
                                Products
                            </AdminDashboardNavLink>
                            <AdminDashboardNavLink href="/admin/users" collapsed={collapsed} setCollapsed={setCollapsed}>
                               
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className='min-w-[20px] min-h-[20px] max-h-[20px] max-w-[20px] object-contain'>
                                    <path d="M11.5 0C5.15671 0 0 5.16171 0 11.5082C0 17.8546 5.15671 23 11.5 23C17.8433 23 23 17.8546 23 11.5082C23 5.16171 17.8433 0 11.5 0ZM11.5 1.04545C17.2784 1.04545 21.9464 5.72683 21.9464 11.5082C21.9464 17.2895 17.2784 21.9627 11.5 21.9627C5.72157 21.9627 1.04545 17.2895 1.04545 11.5082C1.04545 5.72683 5.72157 1.04545 11.5 1.04545ZM11.5 4.44318C9.48531 4.44318 7.84091 6.0864 7.84091 8.10227C7.84091 10.1181 9.48531 11.7695 11.5 11.7695C13.5147 11.7695 15.1591 10.1181 15.1591 8.10227C15.1591 6.0864 13.5147 4.44318 11.5 4.44318ZM11.5 5.48864C12.9497 5.48864 14.1136 6.65173 14.1136 8.10227C14.1136 9.55279 12.9497 10.7241 11.5 10.7241C10.0503 10.7241 8.88636 9.55279 8.88636 8.10227C8.88636 6.65173 10.0503 5.48864 11.5 5.48864ZM11.5 12.0227C7.89929 12.0227 4.96591 14.9488 4.96591 18.5568H6.01136C6.01136 15.5148 8.46405 13.0682 11.5 13.0682C14.5359 13.0682 16.9805 15.5148 16.9805 18.5568H18.0341C18.0341 14.9488 15.1007 12.0227 11.5 12.0227Z" 
                                    className='fill-white group-hover:fill-black group-[.text-black]:fill-black'/>
                                </svg>
                                Users
                            </AdminDashboardNavLink>
                            <AdminDashboardNavLink href="/admin/rewards" collapsed={collapsed} setCollapsed={setCollapsed}>
                                <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='min-w-[20px] min-h-[20px] max-h-[20px] max-w-[20px] object-contain'>
                                    <path d="M14.8318 0.156982C15.8879 -0.0375826 16.9685 0.280743 17.7478 1.00757L17.9002 1.15894L17.9021 1.16089C18.2552 1.55507 18.5624 2.08369 18.615 2.75073C18.6647 3.38083 18.4831 4.12022 17.9217 4.97437H20.9861C21.6934 4.97563 22.2681 5.54901 22.2693 6.25757V8.98901C22.2681 9.69736 21.6936 10.2721 20.9861 10.2722H20.9617V22.0164C20.9617 22.7252 20.3859 23.2983 19.6775 23.2996H2.69023C1.98292 23.2983 1.408 22.7251 1.408 22.0164V10.2722H1.38457C0.675868 10.2722 0.101605 9.69751 0.100388 8.98901V6.25757C0.101603 5.54891 0.676159 4.97558 1.38457 4.97437H4.44902C3.88787 4.12001 3.70624 3.38056 3.75566 2.75073C3.80808 2.08372 4.11582 1.55513 4.46953 1.16089L4.47148 1.15894C5.25789 0.327475 6.41178 -0.049969 7.53691 0.156982L7.53789 0.156006C8.40692 0.271945 9.2247 0.638031 9.88945 1.20972C10.4765 1.71569 10.9218 2.36279 11.1863 3.08667C11.413 2.46519 11.7729 1.9001 12.242 1.43335L12.4832 1.21069C13.1468 0.637988 13.963 0.271996 14.8318 0.156006V0.156982ZM2.23222 22.0164C2.23222 22.2697 2.43773 22.4743 2.69023 22.4744H8.69218V10.2722H2.23222V22.0164ZM13.8455 22.4744H19.6775C19.93 22.4743 20.1355 22.2697 20.1355 22.0164V10.2722H13.8455V22.4744ZM9.51738 22.4744H13.0213V10.2722H9.51738V22.4744ZM1.38457 5.79761C1.13042 5.79853 0.924606 6.00437 0.924606 6.25757V8.98804C0.924746 9.24145 1.13113 9.44702 1.38457 9.44702H8.69218V5.79761H1.38457ZM13.8455 9.44702H20.9852L21.077 9.43726C21.2845 9.39401 21.4411 9.20984 21.4412 8.98901V6.25757C21.4412 6.03562 21.2845 5.85046 21.075 5.80737L20.9832 5.79761H13.8455V9.44702ZM9.51738 9.44702H13.0203L13.0213 5.79761H9.51738V9.44702ZM7.40117 0.970459C6.55239 0.809915 5.68008 1.08855 5.08281 1.71167L4.94511 1.87964C4.64996 2.27649 4.53338 2.71187 4.58965 3.18628C4.65343 3.72331 4.94131 4.31956 5.46367 4.97437H10.7635C10.7355 4.49485 10.6209 3.65909 10.1883 2.8689C9.72485 2.02244 8.8955 1.22359 7.40312 0.970459H7.40117ZM17.2908 1.71265C16.6934 1.08725 15.8196 0.806507 14.9695 0.968506H14.9676C13.4705 1.22171 12.6403 2.02106 12.1775 2.86792C11.7456 3.65847 11.6331 4.49436 11.6062 4.97339H16.909C17.4313 4.31853 17.7183 3.72222 17.782 3.1853C17.8462 2.64395 17.6855 2.15384 17.2908 1.71265Z" 
                                    className='fill-white group-hover:fill-black storke-white group-hover:stroke-black group-[.text-black]:fill-black group-[.text-black]:stroke-black' strokeWidth="0.2"  />
                                </svg>
                                Rewards
                            </AdminDashboardNavLink>
                        </nav>
                    </div>
                    <div className='flex items-center justify-center py-[20px] h-[80px]'>
                        <button className={`bg-[#F7F8F80A] border border-[#444444] rounded-[7px] flex items-center  py-[6px] duration-300  ${collapsed ? "text-[0px] px-[15px] gap-[0px]" : "text-sm px-[30px] gap-[10px]"}`}>
                            <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='w-[15px]'>
                                <path d="M10.8432 20.3609H1.37791V1.37791H10.8432C11.224 1.37791 11.5321 1.06971 11.5321 0.688953C11.5321 0.308192 11.224 0 10.8432 0H0.688953C0.308192 0 0 0.308192 0 0.688953V21.0498C0 21.4301 0.308192 21.7388 0.688953 21.7388H10.8432C11.224 21.7388 11.5321 21.4301 11.5321 21.0498C11.5321 20.6695 11.224 20.3609 10.8432 20.3609Z" fill="#F7F8F8" fillOpacity="0.7" />
                                <path d="M16.9593 10.3398L12.6533 6.03389C12.3842 5.76474 11.9483 5.76474 11.6791 6.03389C11.41 6.30259 11.41 6.73938 11.6791 7.00807L14.852 10.1809H7.51879C7.13803 10.1809 6.82983 10.4896 6.82983 10.8699C6.82983 11.2502 7.13803 11.5588 7.51879 11.5588H14.8525L11.6796 14.7317C11.4105 15.0008 11.4105 15.4367 11.6796 15.7059C11.8142 15.8404 11.9905 15.9075 12.1669 15.9075C12.3433 15.9075 12.5197 15.8404 12.6542 15.7059L16.9602 11.3999C17.1058 11.2543 17.166 11.0605 17.1536 10.8699C17.165 10.6793 17.1053 10.4854 16.9593 10.3398Z" fill="#F7F8F8" fillOpacity="0.7" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
                <div className='opacity-[0.3] blur-[200px] absolute left-[-50px] top-[30%] -translate-y-1/2 h-[250px] w-[300px] rounded-full z-[-1] bg-[#75DA5B]'></div>
            </div>
        </>
    )
}

export default AdminDashboardSidebar
