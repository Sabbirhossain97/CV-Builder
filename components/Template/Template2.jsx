import React from 'react'
import { useState, useContext, useRef } from 'react'
import { DataContext } from '../../pages/CVBuilder'
import { Form, Email, Phone, Location } from '../SvgComponents/SVG';
import { months, parseDescription, parseProjectDetails, parseActivityDetails, colorPicker, dateConverter } from '../helpers/helpers';
import ReactToPrint from 'react-to-print';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Image from 'next/image';

function Template2() {
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
    return (
        <div className="template-preview mx-auto scale-75 sm:scale-75 md:scale-75 lg:scale-75 xl:scale-75">
            <div
                ref={targetRef}
                id="template-wrapper"
                className="bg-white h-screen overflow-auto mx-auto print:h-auto print:min-h-0 print:overflow-visible print:shadow-none"
            >
                <main className="template-2-layout mx-auto flex min-h-[1120px] w-full overflow-hidden bg-white font-poppins">
                    <div
                        className="template-2-sidebar-bg"
                        style={{ backgroundColor: colors || "#1e2b40" }}
                    />
                    {/* Left Sidebar */}
                    <aside
                        className="template-2-sidebar-content w-[276px] shrink-0 px-[29px] py-[42px] text-white"
                        style={{ backgroundColor: colors || "#3d3d3d" }}
                    >
                        {/* Photo */}
                        <div className="flex justify-center">
                            <div className="h-[132px] w-[132px] overflow-hidden rounded-full border-4 border-white/20">
                                <Image
                                    src={picture ? picture : "/images/dummy.png"}
                                    alt={`${firstname || "Profile"} ${lastname || "photo"}`}
                                    width={132}
                                    height={132}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>


                        {/* Contact */}
                        {(city || country || postalcode || phone || email) && (
                            <section className="mt-8">
                                <h2 className="text-[18px] font-bold uppercase tracking-wide">
                                    Contact
                                </h2>

                                <div className="mt-3 h-[1px] w-full bg-white/40" />

                                <div className="mt-4 space-y-3 break-words text-[13px] leading-[1.45]">
                                    {(city || country || postalcode) && (
                                        <p>
                                            <span className="font-bold">Address</span>
                                            <br />
                                            {[city, country, postalcode]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </p>
                                    )}

                                    {phone && (
                                        <p>
                                            <span className="font-bold">Phone</span>
                                            <br />
                                            {phone}
                                        </p>
                                    )}

                                    {email && (
                                        <p>
                                            <span className="font-bold">Email</span>
                                            <br />
                                            {email}
                                        </p>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Skills */}
                        {skills?.[0]?.some((entry) =>
                            Object.values(entry).some((item) => item !== "")
                        ) && (
                                <section className="mt-8">
                                    <h2 className="text-[18px] font-bold uppercase tracking-wide">
                                        Skills
                                    </h2>

                                    <div className="mt-3 h-[1px] w-full bg-white/40" />

                                    <ul className="mt-4 list-disc space-y-2 pl-5 text-[13px] leading-[1.45]">
                                        {skills[0]
                                            .filter((item) => item.skill)
                                            .map((item, index) => (
                                                <li key={index}>
                                                    {item.skill}
                                                    {showExpLevel && item.level
                                                        ? ` — ${item.level}`
                                                        : ""}
                                                </li>
                                            ))}
                                    </ul>
                                </section>
                            )}

                        {/* Languages */}
                        {languages?.[0]?.some((entry) =>
                            Object.values(entry).some((item) => item !== "")
                        ) && (
                                <section className="mt-8">
                                    <h2 className="text-[18px] font-bold uppercase tracking-wide">
                                        Languages
                                    </h2>

                                    <div className="mt-3 h-[1px] w-full bg-white/40" />

                                    <ul className="mt-4 list-disc space-y-2 pl-5 text-[13px] leading-[1.45]">
                                        {languages[0]
                                            .filter((language) => language.name)
                                            .map((language, index) => (
                                                <li key={index}>
                                                    {language.name}
                                                    {!showLangLevel && language.level
                                                        ? ` — ${language.level}`
                                                        : ""}
                                                </li>
                                            ))}
                                    </ul>
                                </section>
                            )}

                        {/* Interests */}
                        {hobbies[0].length > 0 && (
                            <section className="mt-8">
                                <h2 className="text-[18px] font-bold uppercase tracking-wide">
                                    Interests
                                </h2>

                                <div className="mt-3 h-[1px] w-full bg-white/40" />

                                <ul className="mt-4 list-disc space-y-2 pl-5 text-[13px] leading-[1.45]">
                                    {hobbies[0].map(
                                        (item, index) =>
                                            item.trim() && (
                                                <li key={index}>{item.trim()}</li>
                                            )
                                    )}
                                </ul>
                            </section>
                        )}
                    </aside>

                    {/* Right Side */}
                    <section className="flex-1 template-2-content px-[35px] py-[38px] text-black">
                        {/* Name / Occupation / Social Links */}
                        <header className="flex items-start justify-between gap-8 border-b border-gray-200 pb-5">
                            <div className="min-w-0">
                                <h1
                                    className="break-words text-[31px] font-bold uppercase leading-[1.05] tracking-wide"
                                    style={{ color: colors || "#3d3d3d" }}
                                >
                                    {firstname || lastname
                                        ? `${firstname || ""} ${lastname || ""}`.trim()
                                        : "Your Name"}
                                </h1>

                                {occupation && (
                                    <p className="mt-2 text-[15px] font-medium uppercase tracking-[0.12em] text-gray-600">
                                        {occupation}
                                    </p>
                                )}
                            </div>

                            {/* Social Links Top Right */}
                            {socials?.[0]?.some(
                                (social) => social.label || social.linkurl
                            ) && (
                                    <div className="max-w-[230px] shrink-0 text-right text-[12px] leading-[1.6] text-gray-600">
                                        {socials[0]
                                            .filter(
                                                (social) =>
                                                    social.label || social.linkurl
                                            )
                                            .map((social, index) => (
                                                <a
                                                    key={index}
                                                    href={social.linkurl || "#"}
                                                    target={
                                                        social.linkurl
                                                            ? "_blank"
                                                            : undefined
                                                    }
                                                    rel="noreferrer"
                                                    className="flex items-center justify-end gap-2 break-all hover:underline"
                                                >
                                                    <span>
                                                        {social.label || social.linkurl}
                                                    </span>
                                                    {social.icon}
                                                </a>
                                            ))}
                                    </div>
                                )}
                        </header>

                        {about && (
                            <section className="mt-8">
                                <h2 className="text-[18px] font-bold uppercase tracking-wide">
                                    About Me
                                </h2>

                                <div className="mt-0 h-[1px] w-full bg-white/40" />

                                <p className="mt-2 break-words text-[13px] leading-[1.55]">
                                    {about}
                                </p>
                            </section>
                        )}

                        {/* Experience */}
                        {employment?.[0]?.some(
                            (job) =>
                                job.employer ||
                                job.jobtitle ||
                                job.description
                        ) && (
                                <section className="mt-8">
                                    <h2
                                        className="text-[23px] font-extrabold uppercase"
                                        style={{ color: colors || "#3d3d3d" }}
                                    >
                                        Experience
                                    </h2>

                                    {employment[0]
                                        .filter(
                                            (job) =>
                                                job.employer ||
                                                job.jobtitle ||
                                                job.description
                                        )
                                        .map((job, index) => (
                                            <div key={index} className="mt-2">
                                                {(job.jobtitle || job.employer) && (
                                                    <h3 className="text-[16px] font-bold">
                                                        {job.jobtitle}
                                                        {job.jobtitle && job.employer ? (
                                                            <span className="font-normal">
                                                                {" "}
                                                                | {job.employer}
                                                            </span>
                                                        ) : (
                                                            job.employer
                                                        )}
                                                    </h3>
                                                )}

                                                {(job.startdate || job.enddate) && (
                                                    <p className="mt-1 text-[14px]">
                                                        <span
                                                            style={{
                                                                color:
                                                                    colors || "#5d83b7",
                                                            }}
                                                        >
                                                            {dateConverter(
                                                                job.startdate,
                                                                job.enddate,
                                                                job.ongoing
                                                            )}
                                                        </span>
                                                    </p>
                                                )}

                                                {job.description &&
                                                    job.description !==
                                                    "<p><br></p>" && (
                                                        <ul className="mt-3 list-disc space-y-1 pl-6 text-[14px] leading-[1.4]">
                                                            {parseDescription(
                                                                job.description
                                                            )}
                                                        </ul>
                                                    )}
                                            </div>
                                        ))}
                                </section>
                            )}

                        {/* Education */}
                        {education?.[0]?.some(
                            (edc) =>
                                edc.degree ||
                                edc.institution ||
                                edc.institutioncity
                        ) && (
                                <section className="mt-8">
                                    <h2
                                        className="text-[23px] font-extrabold uppercase"
                                        style={{ color: colors || "#3d3d3d" }}
                                    >
                                        Education
                                    </h2>

                                    {education[0]
                                        .filter(
                                            (edc) =>
                                                edc.degree ||
                                                edc.institution ||
                                                edc.institutioncity
                                        )
                                        .map((edc, index) => (
                                            <div
                                                key={index}
                                                className="mt-2 text-[14px] leading-[1.45]"
                                            >
                                                {(edc.institution ||
                                                    edc.institutioncity) && (
                                                        <p>
                                                            {edc.institution && (
                                                                <span className="font-bold">
                                                                    {edc.institution}
                                                                </span>
                                                            )}
                                                            {edc.institution &&
                                                                edc.institutioncity
                                                                ? ", "
                                                                : ""}
                                                            {edc.institutioncity}
                                                        </p>
                                                    )}

                                                {edc.degree && <p>{edc.degree}</p>}

                                                {(edc.startdate || edc.enddate) && (
                                                    <p
                                                        style={{
                                                            color:
                                                                colors || "#5d83b7",
                                                        }}
                                                    >
                                                        {edc.startdate}
                                                        {(edc.startdate && edc.enddate) && (edc.startdate !== edc.enddate) ? " - " : ""}
                                                        {(edc.ongoing || edc.startdate === edc.enddate) ? " - Present" : edc.enddate ? edc.enddate : ""}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                </section>
                            )}

                        {/* Projects */}
                        {project?.[0]?.some(
                            (pro) => pro.projecttitle || pro.description
                        ) && (
                                <section className="mt-8">
                                    <h2
                                        className="text-[23px] font-extrabold uppercase"
                                        style={{ color: colors || "#3d3d3d" }}
                                    >
                                        Projects
                                    </h2>

                                    {project[0]
                                        .filter(
                                            (pro) =>
                                                pro.projecttitle || pro.description
                                        )
                                        .map((pro, index) => (
                                            <div key={index} className="mt-2">
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
                                                {pro.technologies.length > 0 && <p className="text-md mt-1 font-bold text-gray-700">Technologies: <span className='text-sm font-semibold'>{pro.technologies.join(", ")}</span></p>}

                                                {(pro.startdate || pro.enddate) && (
                                                    <p
                                                        className="mt-1 text-[14px]"
                                                        style={{
                                                            color:
                                                                colors || "#5d83b7",
                                                        }}
                                                    >
                                                        {dateConverter(
                                                            pro.startdate,
                                                            pro.enddate,
                                                            pro.ongoing
                                                        )}
                                                    </p>
                                                )}

                                                {pro.description && (
                                                    <ul className="mt-3 list-disc space-y-1 pl-6 text-[14px] leading-[1.4]">
                                                        {parseProjectDetails(
                                                            pro.description
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                </section>
                            )}

                        {/* Extra Curricular Activities */}
                        {extraCurricular?.[0]?.some(
                            (item) =>
                                item.role ||
                                item.title ||
                                item.institution ||
                                item.description
                        ) && (
                                <section className="mt-8">
                                    <h2
                                        className="text-[23px] font-extrabold uppercase"
                                        style={{ color: colors || "#3d3d3d" }}
                                    >
                                        Extra Curricular Activities
                                    </h2>

                                    {extraCurricular[0]
                                        .filter(
                                            (item) =>
                                                item.role ||
                                                item.title ||
                                                item.institution ||
                                                item.description
                                        )
                                        .map((item, index) => (
                                            <div key={index} className="mt-5">
                                                {(item.role ||
                                                    item.title ||
                                                    item.institution) && (
                                                        <>
                                                            <h3 className="text-[16px] font-bold">
                                                                {[
                                                                    item.role,
                                                                    item.title,
                                                                ]
                                                                    .filter(Boolean)
                                                                    .join(" - ")}
                                                            </h3>
                                                            <h3 className="text-[14px] font-medium">
                                                                {item.institution}
                                                            </h3>
                                                        </>
                                                    )}

                                                {(item.startdate || item.enddate) && (
                                                    <p
                                                        className="mt-1 text-[14px]"
                                                        style={{
                                                            color:
                                                                colors || "#5d83b7",
                                                        }}
                                                    >
                                                        {dateConverter(
                                                            item.startdate,
                                                            item.enddate,
                                                            item.ongoing
                                                        )}
                                                    </p>
                                                )}

                                                {item.description && (
                                                    <ul className="mt-3 list-disc space-y-1 pl-6 text-[14px] leading-[1.4]">
                                                        {parseActivityDetails(
                                                            item.description
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                </section>
                            )}

                        {/* References */}
                        {reference?.[0]?.some(
                            (ref) =>
                                ref.referrername ||
                                ref.position ||
                                ref.organization ||
                                ref.email ||
                                ref.phone
                        ) && (
                                <section className="mt-8">
                                    <h2
                                        className="text-[23px] font-extrabold uppercase"
                                        style={{ color: colors || "#3d3d3d" }}
                                    >
                                        References
                                    </h2>

                                    {reference[0]
                                        .filter(
                                            (ref) =>
                                                ref.referrername ||
                                                ref.position ||
                                                ref.organization ||
                                                ref.email ||
                                                ref.phone
                                        )
                                        .map((ref, index) => (
                                            <div
                                                key={index}
                                                className="mt-2 text-[14px] leading-[1.45]"
                                            >
                                                <p className="font-bold">
                                                    {[
                                                        ref.referrername,
                                                        ref.position,
                                                        ref.organization,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" | ")}
                                                </p>

                                                {(ref.address ||
                                                    ref.email ||
                                                    ref.phone) && (
                                                        <>
                                                            <p>
                                                                {ref.address}
                                                            </p>
                                                            <p>
                                                                {ref.email}
                                                            </p>
                                                            <p>
                                                                {ref.phone}
                                                            </p>
                                                        </>
                                                    )}
                                            </div>
                                        ))}
                                </section>
                            )}
                    </section>
                </main>
            </div>

            <div className="w-full flex gap-2 py-5">
                {colorPicker.map((color, index) => (
                    <div
                        key={index}
                        onClick={() => handleColorChange(color.name)}
                        className="cursor-pointer border transition duration-300 hover:border-2 w-8 h-10 rounded-md"
                        style={{ background: color.name }}
                    />
                ))}

                <div className="w-3/4 flex justify-end custom-end:justify-end">
                    <ReactToPrint
                        trigger={() => (
                            <button className="bg-slate-800 transition hover:bg-slate-700 text-white p-3 rounded-md py-3 text-sm">
                                Print and Download
                            </button>
                        )}
                        content={() => targetRef.current}
                    />
                </div>
            </div>
        </div>
    )
}

export default Template2