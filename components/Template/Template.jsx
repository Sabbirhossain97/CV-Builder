import React from 'react'
import { useState, useContext, useRef } from 'react'
import { DataContext } from '../../pages/CVBuilder'
import { Form, Email, Phone, Location} from '../SvgComponents/SVG';
import { months, parseDescription, parseProjectDetails, parseActivityDetails, colorPicker, dateConverter } from '../helpers/helpers';
import ReactToPrint from 'react-to-print';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Image from 'next/image';
import Template2 from './Template2';

function Template() {
    const targetRef = useRef();
    const [colors, setColors] = useState("");
    const { imageUrls, personalInformation, summary, employment, education, socials, skills, project, extraCurricular, languages, hobbies, reference, skillExpLevel, langLevel, previewTemplate } = useContext(DataContext);
    const [{ firstname, lastname, email, phone, country, city, occupation, postalcode }] = personalInformation[0]
    const [picture] = imageUrls[0];
    const [{ summary: about }] = summary[0];
    const [showExpLevel] = skillExpLevel;
    const [showLangLevel] = langLevel;
    const { hobbies: interests } = hobbies[0];
    const [showTemplate, setShowTemplate] = previewTemplate;
    const [tabValue, setTabValue] = React.useState('1');

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleColorChange = (name) => {
        setColors(name)
    }

    console.log(project, 'project')

    return (
        <div className="template-preview mx-auto scale-75 sm:scale-75 md:scale-75 lg:scale-75 xl:scale-75">
            <div ref={targetRef}
                id="template-wrapper"
                className="bg-white shadow-lg h-screen overflow-auto mx-auto print:h-auto print:min-h-0 print:overflow-visible print:shadow-none">
                <div className={`flex w-full bg-slate-800 sm:px-2 gap-10`} style={{ background: colors }}>
                    <div className="left-5 top-10 h-40 w-40 overflow-hidden sm:relative sm:rounded-full sm:p-0">
                        <Image
                            src={picture ? picture : `/images/dummy.png`}
                            alt="cover"
                            width={160}
                            height={160}
                        />
                    </div>

                    <div className="mt-10 w-3/4 text-start sm:text-left flex justify-between items-center">
                        <div className='flex flex-col'>
                            <p className="font-poppins text-heading text-2xl font-bold text-white sm:text-4xl">{firstname} {lastname}</p>
                            <p className="text-heading text-white">{occupation}</p>
                            {city && country && postalcode ? <p className='flex items-center text-white gap-1'><Location /> {`${city + ", " + country + ", " + postalcode}`}</p> : null}
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <div className="flex sm:mt-10 sm:flex-row gap-10">
                        <div className="flex flex-col py-3 w-1/2 sm:w-1/3">
                            {/* contact section */}
                            <h2 className="font-poppins text-lg font-bold" style={{ color: colors }}>Contact</h2>
                            <div className="border-top-color my-3 w-20 border-2"></div>

                            <div className='flex flex-col'>
                                <div className="my-1 flex w-1/2 items-center ">
                                    {
                                        email &&
                                        <>
                                            <div class="mr-2">
                                                <Email />
                                            </div>
                                            <div class="flex-grow" style={{ overflowWrap: 'break-word' }}>
                                                {email}
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="my-1 flex items-center">
                                    {phone && <a className="w-6 text-gray-700 hover:text-orange-600" aria-label="Visit TrendyMinds YouTube" href="" target="_blank"
                                    >
                                        <Phone />
                                    </a>}
                                    <div>{phone}</div>
                                </div>
                            </div>

                            {/* skills section */}
                            <div className=" py-3 ">
                                <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>Skills</h2>
                                <div className="border-top-color my-3 w-20 border-2"></div>
                                <>
                                    {showExpLevel ? (<div className='flex gap-2 flex-wrap'>
                                        {skills?.[0].some((entry) => Object.values(entry).some((item) => item !== "")) && skills?.[0].map((item, index) => (
                                            <div key={index} className="bg-slate-800 flex justify-center items-center border flex-wrap rounded-md">
                                                <p className="px-3 py-1 text-sm text-white">{item.skill}</p>
                                            </div>
                                        ))}
                                    </div>) : (skills?.[0] && skills?.[0].map((item, index) => (
                                        <div key={index} className="my-1 flex items-center justify-between">
                                            <div className="">{item.skill}</div>
                                            <div>{item.level} </div>
                                        </div>
                                    )))}
                                </>
                            </div>

                            <div className="py-3">
                                <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>Social Links</h2>
                                <div className="border-top-color my-3 w-20 border-2"></div>
                                <div className='pt-1 flex flex-col gap-2'>
                                    {socials?.[0] && socials?.[0].map((social, index) => (
                                        <a key={index} href={social.linkurl} className="flex gap-2 justify-start items-center">
                                            {social.icon}
                                            {social.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {
                                languages?.[0].some((entry) => Object.values(entry).some((item) => item !== "")) && <div className="order-3 py-3 sm:order-none">
                                    <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>Languages</h2>
                                    <div className="border-top-color my-3 w-20 border-2"></div>
                                    <>
                                        {!showLangLevel ? (
                                            <div className='pt-1 flex flex-wrap items-center gap-2'>
                                                {languages?.[0] && languages?.[0].map((language, index) => (
                                                    <div key={index} className='w-full'>
                                                        <p className='w-full flex items-center'>{language.name}{" - "} <span className='text-sm ml-2 italic text-gray-500'>{language.level}</span></p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className='pt-1 flex flex-wrap items-center gap-2'>
                                                {languages?.[0] && languages?.[0].map((language, index) => (
                                                    <div key={index} className='w-full'>
                                                        <p className='w-full flex'>{language.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>

                                </div>
                            }

                            {interests && <div className="py-3">
                                <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>Interests</h2>
                                <div className="border-top-color my-3 w-20 border-2"></div>
                                <div className='flex flex-wrap gap-2'>
                                    {interests.split(",").map((item, index) => (
                                        <div key={index} className="bg-slate-800 flex items-center border flex-wrap rounded-md">
                                            <p className="px-3 py-1 text-sm text-white">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            }

                        </div>

                        <div className="flex flex-col w-1/2 sm:w-2/3">
                            <div className="py-3">
                                <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>About</h2>
                                <div className="border-top-color my-3 w-20 border-2"></div>
                                <p className='text-left break-all ...'>{about}</p>
                            </div>

                            <div className="py-3">
                                <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>Experience</h2>
                                <div className="border-top-color my-3 w-20 border-2"></div>

                                <div className="flex flex-col">
                                    {employment?.[0] && employment?.[0].map((job, index) => (
                                        <div key={index} className="flex flex-col mt-2">
                                            {(job.employer || job.jobtitle) ? <p className="text-lg font-bold text-gray-700">{job.employer} {(job.employer && job.jobtitle) ? "|" : ""} {job.jobtitle}</p> : null}
                                            {(job.startdate || job.enddate) ? <p className="text-sm font-semibold text-gray-700">{dateConverter(job.startdate, job.enddate, job.ongoing)}</p> : null}
                                            {job.description && (
                                                <>
                                                    <p className="mb-1 mt-2 text-sm font-semibold text-gray-700">{job.description !== "<p><br></p>" && "Key Responsibilities"}</p>
                                                    <ul className="list-disc space-y-1 pl-4 text-sm">
                                                        {job.description && parseDescription(job.description)}
                                                    </ul>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="py-3">
                                <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>Education</h2>
                                <div className="border-top-color my-3 w-20 border-2"></div>

                                <div className="flex flex-col space-y-2">
                                    {education?.[0] &&
                                        education?.[0].map((edc, index) => {
                                            const educationInfo = [
                                                edc.degree,
                                                edc.institution,
                                                edc.institutioncity,
                                            ].filter(Boolean);

                                            return (
                                                <div key={index} className="flex flex-col">
                                                    {educationInfo.length > 0 && (
                                                        <p className="text-lg font-medium">
                                                            {educationInfo.map((item, itemIndex) => (
                                                                <React.Fragment key={itemIndex}>
                                                                    {itemIndex > 0 && ", "}
                                                                    {itemIndex === 0 ? (
                                                                        <span>{item}</span>
                                                                    ) : (
                                                                        item
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                            .
                                                        </p>
                                                    )}

                                                    {(edc.startdate || edc.enddate) && (
                                                        <p className="text-sm font-semibold text-gray-700">
                                                            {edc.startdate}
                                                            {(edc.startdate && edc.enddate) && (edc.startdate !== edc.enddate) ? " - " : ""}
                                                            {(edc.ongoing || edc.startdate === edc.enddate) ? " - Present" : edc.enddate ? edc.enddate : ""}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                            {
                                project?.[0].some((entry) => Object.values(entry).some((item) => item !== "")) && <div className="py-3">
                                    <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>Projects</h2>
                                    <div className="border-top-color my-3 w-20 border-2"></div>

                                    <div className="flex flex-col ">
                                        {project?.[0] && project?.[0].map((pro, index) => (
                                            <div key={index} className="flex flex-col">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <h3 className="text-[16px] font-bold text-gray-800">
                                                        {pro.projecttitle}
                                                    </h3>

                                                    {(pro.liveurl || pro.githuburl) && (
                                                        <div className="flex items-center gap-2 border-l border-gray-300 pl-2">
                                                            {pro.liveurl && (
                                                                <a
                                                                    href={pro.liveurl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="flex items-center gap-1 text-[12px] font-medium text-gray-600 hover:text-blue-700"
                                                                    title="Live Demo"
                                                                >
                                                                    <span>Live</span>
                                                                </a>
                                                            )}

                                                            {pro.githuburl && (
                                                                <a
                                                                    href={pro.githuburl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="flex items-center gap-1 text-[12px] font-medium text-gray-600 hover:text-blue-700"
                                                                    title="GitHub Repository"
                                                                >
                                                                    <span>GitHub</span>
                                                                </a>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                {pro.technologies.length > 0 && <p className="text-md font-bold text-gray-700">Technologies: <span className='text-sm font-semibold'>{pro.technologies.join(", ")}</span></p>}
                                                {pro.startdate && pro.enddate ? <p className="text-sm font-bold text-gray-700">{months[Number(pro.startdate.split("-")[1])]} {pro.startdate.split("-")[0]} - {months[Number(pro.enddate.split("-")[1])]} {pro.enddate.split("-")[0]}</p> : null}
                                                {pro.description && (
                                                    <div className='py-2'>
                                                        <ul className="list-disc space-y-1 pl-4 text-sm">
                                                            {pro.description && parseProjectDetails(pro.description)}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }

                            {
                                extraCurricular?.[0].some((entry) => Object.values(entry).some((item) => item !== "")) && <div className="py-3">
                                    <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>Extra Currricular Activites</h2>
                                    <div className="border-top-color my-3 w-20 border-2"></div>

                                    <div className="flex flex-col ">
                                        {extraCurricular?.[0] && extraCurricular?.[0].map((item, index) => (
                                            <div key={index} className="flex flex-col">
                                                {item.role && item.title && item.institution ? <p className="text-lg font-bold text-gray-700">{item.role} | {item.title} | {item.institution}</p> : null}
                                                {item.startdate && item.enddate ? <p className="text-sm font-bold text-gray-700">
                                                    {dateConverter(item.startdate, item.enddate)}
                                                </p> : null}
                                                {item.description && (
                                                    <div className='py-2'>
                                                        <ul className="list-disc space-y-1 pl-4 text-sm">
                                                            {item.description && parseActivityDetails(item.description)}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }

                            {
                                reference?.[0].some((entry) => Object.values(entry).some((item) => item !== "")) && <div className="order-1 py-3 sm:order-none">
                                    <h2 className="font-poppins text-top-color text-lg font-bold" style={{ color: colors }}>References</h2>
                                    <div className="border-top-color my-3 w-20 border-2"></div>

                                    <div className="flex flex-col space-y-2">
                                        {reference?.[0] && reference?.[0].map((ref, index) => (
                                            <div key={index} className="flex flex-col">
                                                {ref.referrername && ref.position && ref.organization && <p className="text-lg font-medium">
                                                    <span className="text-gray-700">{ref.referrername} - {ref.position} , {ref.organization}</span>
                                                </p>}
                                                {ref.address && ref.email && ref.phone ? <p className="text-sm font-normal text-gray-700">{ref.address} , {ref.email}, {ref.phone}</p> : null}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className=' w-full flex gap-2 py-5'>
                {colorPicker.map((color, index) => (
                    <div key={index} onClick={() => handleColorChange(color.name)} className={`cursor-pointer border transition duration-300 hover:border-2 w-8 h-10 rounded-md `} style={{ background: color.name }}></div>
                ))}
                <div className='w-3/4 flex justify-end custom-end:justify-end'>
                    <ReactToPrint
                        trigger={() =>
                            <button className='bg-slate-800 transition hover:bg-slate-700 text-white p-3 rounded-md py-3 text-sm'>Print and Download</button>
                        }
                        content={() => targetRef.current}
                    />
                </div>
            </div>
        </div>
    )
}

export default Template