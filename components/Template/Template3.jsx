import React, { useContext, useRef, useState } from "react";
import Image from "next/image";
import ReactToPrint from "react-to-print";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { DataContext } from "../../pages/CVBuilder";
import {
    parseDescription,
    parseProjectDetails,
    parseActivityDetails,
    colorPicker,
    dateConverter,
    fontPicker
} from "../helpers/helpers";
import {
    FormControl,
    InputLabel,
    Select,
    Menu,
    CircularProgress,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from "@mui/material";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

function Template3({ save, load, loading, exportJSON, importJSON, draftLoading }) {
    const targetRef = useRef();
    const importInputRef = useRef(null);
    const [colors, setColors] = useState("");
    const [tabValue, setTabValue] = useState("1");

    const {
        imageUrls,
        personalInformation,
        summary,
        employment,
        education,
        socials,
        skills,
        project,
        certification,
        extraCurricular,
        languages,
        hobbies,
        reference,
        skillExpLevel,
        langLevel,
        previewTemplate,
        profileCompleteness
    } = useContext(DataContext);

    const [{ firstname, lastname, email, phone, country, city, occupation, postalcode } = {}] =
        personalInformation[0] || [{}];

    const [picture] = imageUrls?.[0] || [];
    const [{ summary: about } = {}] = summary[0] || [{}];
    const [showExpLevel] = skillExpLevel || [];
    const [showLangLevel] = langLevel || [];
    const [{ hobbies: interests } = {}] = hobbies || [{}];
    const [, setShowTemplate] = previewTemplate || [];
    const [selectedFont, setSelectedFont] = useState("Inter, sans-serif");

    const handleFontChange = (font) => {
        setSelectedFont(font);
    };

    const primaryColor = colors || "#1e2b40";

    const handleColorChange = (color) => {
        setColors(color);
    };

    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
    };

    const hasData = (items, fields = []) =>
        items?.[0]?.some((item) => fields.some((field) => item?.[field]));

    const SectionTitle = ({ title, icon, className = "" }) => (
        <div className={`mb-4 ${className}`}>
            <h2 className="flex items-center text-[19px] font-bold text-gray-800">
                {title}
            </h2>

            <div
                className="mt-2 h-1 w-16 rounded-full"
                style={{ backgroundColor: primaryColor }}
            />
        </div>
    );

    const [anchorEl, setAnchorEl] = useState(null);
    const draftMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLoadDraft = async () => {
        handleMenuClose();
        await load();
    };

    const handleSaveDraft = async () => {
        handleMenuClose();
        await save();
    };

    const handleImportClick = () => {
        handleMenuClose();
        importInputRef.current?.click();
    };

    const handleExportClick = async () => {
        handleMenuClose();
        await exportJSON();
    };

    return (
        <div className="template-preview mx-auto scale-[0.82]">
            <div
                ref={targetRef}
                id="template-wrapper"
                style={{ fontFamily: selectedFont }}
                className="mx-auto h-screen overflow-auto bg-gray-50 print:h-auto print:min-h-0 print:overflow-visible print:bg-white print:shadow-none"
            >
                <div className="w-full min-w-[794px] min-h-[1123px] bg-white shadow-lg print:shadow-none">
                    <main className="mx-auto min-h-[1120px] w-full max-w-[1000px] bg-white font-poppins text-gray-700 shadow-xl print:max-w-none print:shadow-none">
                        {/* Header */}
                        <header
                            className="p-7 md:p-10"
                            style={{ backgroundColor: colors || "#1e2b40" }}
                        >
                            <div className="flex flex-col items-center gap-7 md:flex-row">
                                <div className="flex justify-center">
                                    <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-lg">
                                        <Image
                                            src={picture || "/images/dummy.png"}
                                            alt={`${firstname || "Profile"} ${lastname || "photo"}`}
                                            width={144}
                                            height={144}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="break-words text-[31px] font-bold leading-tight text-white md:text-[39px]">
                                        {firstname || lastname
                                            ? `${firstname || ""} ${lastname || ""}`.trim()
                                            : "Your Name"}
                                    </h1>

                                    {occupation && (
                                        <p className="mt-0 text-[17px] text-white font-medium tracking-wide md:text-[20px]">
                                            {occupation}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap justify-center gap-2.5 md:justify-start">
                                        {(city || country) && (
                                            <div className="flex max-w-full text-white items-center rounded-full py-1.5 text-[14px]">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mr-2 h-4 w-4 shrink-0"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                {[city, country].filter(Boolean).join(", ")}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 gap-8 p-7 md:grid-cols-3 md:p-10">
                            {/* Main Content */}
                            <section className="md:col-span-2">
                                {about && (
                                    <section className="mb-9">
                                        <SectionTitle title="Professional Summary" />

                                        <p className="text-[13px] leading-[1.7] text-gray-600 text-justify">
                                            {about}
                                        </p>
                                    </section>
                                )}

                                {hasData(employment, ["employer", "jobtitle", "description"]) && (
                                    <section className="mb-9">
                                        <SectionTitle
                                            title="Professional Experience"

                                        />

                                        <div className="space-y-6">
                                            {employment[0]
                                                .filter(
                                                    (job) =>
                                                        job.employer || job.jobtitle || job.description
                                                )
                                                .map((job, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative border-l-2 border-blue-100 pl-6"
                                                    >
                                                        <span
                                                            className="absolute -left-[7px] top-1 h-3 w-3 rounded-full"
                                                            style={{ backgroundColor: primaryColor }}
                                                        />

                                                        {(job.jobtitle || job.employer) && (
                                                            <h3 className="text-[16px] font-bold text-gray-800">
                                                                {job.jobtitle}
                                                                {job.jobtitle && job.employer && (
                                                                    <span className="font-medium text-gray-500">
                                                                        {" "}
                                                                        | {job.employer}
                                                                    </span>
                                                                )}
                                                                {!job.jobtitle && job.employer}
                                                            </h3>
                                                        )}

                                                        {(job.startdate || job.enddate) && (
                                                            <p
                                                                className="mt-1 text-[12px] font-semibold"
                                                                style={{ color: primaryColor }}
                                                            >
                                                                {dateConverter(
                                                                    job.startdate,
                                                                    job.enddate,
                                                                    job.ongoing
                                                                )}
                                                            </p>
                                                        )}

                                                        {job.description &&
                                                            job.description !== "<p><br></p>" && (
                                                                <ul className="mt-3 list-disc space-y-1 pl-5 text-[13px] leading-5 text-gray-600">
                                                                    {parseDescription(job.description)}
                                                                </ul>
                                                            )}
                                                    </div>
                                                ))}
                                        </div>
                                    </section>
                                )}

                                {hasData(project, ["projecttitle", "description"]) && (
                                    <section className="mb-9">
                                        <SectionTitle title="Projects" />

                                        <div className="space-y-4">
                                            {project[0]
                                                .filter((pro) => pro.projecttitle || pro.description)
                                                .map((pro, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-r-lg p-0"
                                                        style={{ borderLeftColor: primaryColor }}
                                                    >
                                                        <div className="flex flex-wrap items-center gap-x-3">
                                                            {pro.projecttitle && (
                                                                <h3 className="text-[16px] font-bold text-gray-800">
                                                                    {pro.projecttitle}
                                                                </h3>
                                                            )}

                                                            {pro.liveurl && (
                                                                <a
                                                                    href={pro.liveurl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-[12px] font-semibold hover:underline"
                                                                    style={{ color: primaryColor }}
                                                                >
                                                                    Live Demo ↗
                                                                </a>
                                                            )}

                                                            {pro.githuburl && (
                                                                <a
                                                                    href={pro.githuburl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-[12px] font-semibold hover:underline"
                                                                    style={{ color: primaryColor }}
                                                                >
                                                                    GitHub ↗
                                                                </a>
                                                            )}
                                                        </div>

                                                        {Array.isArray(pro.technologies) &&
                                                            pro.technologies.length > 0 && (
                                                                <p className="mt-2 text-[12px] text-gray-600">
                                                                    <span className="font-bold text-gray-700">
                                                                        Technologies:
                                                                    </span>{" "}
                                                                    {pro.technologies.join(", ")}
                                                                </p>
                                                            )}

                                                        {(pro.startdate || pro.enddate) && (
                                                            <p
                                                                className="mt-1 text-[12px] font-semibold"
                                                                style={{ color: primaryColor }}
                                                            >
                                                                {dateConverter(
                                                                    pro.startdate,
                                                                    pro.enddate,
                                                                    pro.ongoing
                                                                )}
                                                            </p>
                                                        )}

                                                        {pro.description && (
                                                            <ul className="mt-3 list-disc space-y-1 pl-5 text-[13px] leading-5 text-gray-600">
                                                                {parseProjectDetails(pro.description)}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    </section>
                                )}

                                {hasData(certification, [
                                    "title",
                                    "organization",
                                    "issueDate",
                                    "credentialUrl",
                                    "description",
                                ]) && (
                                        <section className="mb-9">
                                            <SectionTitle title="Certifications" />

                                            <div className="space-y-5">
                                                {certification[0]
                                                    .filter(
                                                        (cert) =>
                                                            cert.title ||
                                                            cert.organization ||
                                                            cert.issueDate ||
                                                            cert.credentialUrl ||
                                                            cert.description
                                                    )
                                                    .map((cert, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative border-l-2 border-blue-100 pl-6"
                                                        >
                                                            <span
                                                                className="absolute -left-[7px] top-1 h-3 w-3 rounded-full"
                                                                style={{ backgroundColor: primaryColor }}
                                                            />

                                                            {cert.title && (
                                                                <h3 className="text-[16px] font-bold text-gray-800">
                                                                    {cert.title}
                                                                </h3>
                                                            )}

                                                            {(cert.organization || cert.issueDate) && (
                                                                <p
                                                                    className="mt-1 text-[12px] font-semibold"
                                                                    style={{ color: primaryColor }}
                                                                >
                                                                    {cert.organization}
                                                                    {cert.organization && cert.issueDate ? " | " : ""}
                                                                    {cert.issueDate}
                                                                </p>
                                                            )}

                                                            {cert.credentialUrl && (
                                                                <a
                                                                    href={cert.credentialUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="mt-1 block break-all text-[12px] font-semibold hover:underline"
                                                                    style={{ color: primaryColor }}
                                                                >
                                                                    View Credential ↗
                                                                </a>
                                                            )}

                                                            {cert.description && (
                                                                <p className="mt-2 break-words text-[13px] leading-5 text-gray-600">
                                                                    {cert.description}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </section>
                                    )}

                                {hasData(extraCurricular, [
                                    "role",
                                    "title",
                                    "institution",
                                    "description",
                                ]) && (
                                        <section className="mb-9">
                                            <SectionTitle
                                                title="Extra Curricular Activities"
                                            />

                                            <div className="space-y-5">
                                                {extraCurricular[0]
                                                    .filter(
                                                        (item) =>
                                                            item.role ||
                                                            item.title ||
                                                            item.institution ||
                                                            item.description
                                                    )
                                                    .map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative border-l-2 border-blue-100 pl-6"
                                                        >
                                                            <span
                                                                className="absolute -left-[7px] top-1 h-3 w-3 rounded-full"
                                                                style={{ backgroundColor: primaryColor }}
                                                            />

                                                            <h3 className="text-[15px] font-bold text-gray-800">
                                                                {[item.role, item.title]
                                                                    .filter(Boolean)
                                                                    .join(" - ")}
                                                            </h3>
                                                            <h3 className="text-[13px] font-medium text-gray-800">
                                                                {item.institution}
                                                            </h3>

                                                            {(item.startdate || item.enddate) && (
                                                                <p
                                                                    className="mt-1 text-[12px] font-semibold"
                                                                    style={{ color: primaryColor }}
                                                                >
                                                                    {dateConverter(
                                                                        item.startdate,
                                                                        item.enddate,
                                                                        item.ongoing
                                                                    )}
                                                                </p>
                                                            )}

                                                            {item.description && (
                                                                <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-5 text-gray-600">
                                                                    {parseActivityDetails(item.description)}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </section>
                                    )}

                                {hasData(reference, [
                                    "referrername",
                                    "position",
                                    "organization",
                                    "email",
                                    "phone",
                                ]) && (
                                        <section>
                                            <SectionTitle title="References" />

                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                                            className="rounded-lg bg-gray-50 p-4 text-[12px] leading-5"
                                                        >
                                                            <p className="font-bold text-gray-800">
                                                                {ref.referrername}
                                                            </p>

                                                            <p className="text-gray-600">
                                                                {[ref.position, ref.organization]
                                                                    .filter(Boolean)
                                                                    .join(" | ")}
                                                            </p>

                                                            {(ref.email || ref.phone || ref.address) && (
                                                                <>
                                                                    <p className="mt-1 break-words text-gray-600">
                                                                        {ref.address}
                                                                    </p>
                                                                    <p className="mt-1 break-words text-gray-600">
                                                                        {ref.email}
                                                                    </p>
                                                                    <p className="mt-1 break-words text-gray-600">
                                                                        {ref.phone}
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </section>
                                    )}
                            </section>

                            {/* Sidebar */}
                            <aside>
                                {hasData(skills, ["skill", "level"]) && (
                                    <section className="mb-9">
                                        <SectionTitle title="Skills" />

                                        {!showExpLevel ? (
                                            <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                                                {skills[0]
                                                    .filter((skill) => skill.skill)
                                                    .map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-md bg-gray-100 px-2 py-1 text-[12px] font-semibold text-gray-700"
                                                        >
                                                            {skill.skill}
                                                        </span>
                                                    ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {skills[0]
                                                    .filter((skill) => skill.skill)
                                                    .map((skill, index) => {
                                                        const percentage = skill.levelCount
                                                            ? (skill.levelCount / 5) * 100
                                                            : 0;

                                                        return (
                                                            <div key={index}>
                                                                <div className="mb-1.5 flex items-center justify-between gap-3">
                                                                    <p className="break-words text-[13px] font-semibold text-gray-700">
                                                                        {skill.skill}
                                                                    </p>
                                                                </div>

                                                                {skill.levelCount && (
                                                                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                                                                        <div
                                                                            className="h-full rounded-full transition-all"
                                                                            style={{
                                                                                width: `${percentage}%`,
                                                                                backgroundColor: primaryColor,
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </section>
                                )}

                                {hasData(education, [
                                    "degree",
                                    "institution",
                                    "institutioncity",
                                ]) && (
                                        <section className="mb-9">
                                            <SectionTitle title="Education" />

                                            <div className="space-y-4">
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
                                                            className="relative border-l-2 border-blue-100 pl-5"
                                                        >
                                                            <span
                                                                className="absolute -left-[7px] top-1 h-3 w-3 rounded-full"
                                                                style={{ backgroundColor: primaryColor }}
                                                            />

                                                            {(edc.startdate || edc.enddate) && (
                                                                <p
                                                                    className="text-[11px] font-bold"
                                                                    style={{ color: primaryColor }}
                                                                >
                                                                    {edc.startdate}
                                                                    {edc.startdate && edc.enddate ? " - " : ""}
                                                                    {edc.ongoing
                                                                        ? "Present"
                                                                        : edc.enddate || ""}
                                                                </p>
                                                            )}

                                                            {edc.degree && (
                                                                <h3 className="mt-1 text-[13px] font-bold text-gray-800">
                                                                    {edc.degree}
                                                                </h3>
                                                            )}

                                                            {(edc.institution || edc.institutioncity) && (
                                                                <p className="mt-1 text-[12px] leading-5 text-gray-600">
                                                                    {[edc.institution, edc.institutioncity]
                                                                        .filter(Boolean)
                                                                        .join(", ")}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </section>
                                    )}

                                {hasData(languages, ["name", "level"]) && (
                                    <section className="mb-9">
                                        <SectionTitle title="Languages" />

                                        <div className="space-y-3">
                                            {languages[0]
                                                .filter((language) => language.name)
                                                .map((language, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between gap-3 rounded- py-2"
                                                    >
                                                        <span className="text-[13px] font-semibold text-gray-700">
                                                            {language.name}
                                                        </span>

                                                        {!showLangLevel && language.level && (
                                                            <span
                                                                className="text-[11px] font-bold"
                                                                style={{ color: primaryColor }}
                                                            >
                                                                {language.level}
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                        </div>
                                    </section>
                                )}

                                {(email || phone || city || country || postalcode || socials?.[0]?.length) && (
                                    <section className="mb-9">
                                        <SectionTitle title="Contact" />

                                        <div className="space-y-3 break-words text-[12px] leading-5 text-gray-600">
                                            {email && (
                                                <div className="flex gap-2">
                                                    <span className="font-bold text-gray-700">Email:</span>
                                                    <span>{email}</span>
                                                </div>
                                            )}

                                            {phone && (
                                                <div className="flex gap-2">
                                                    <span className="font-bold text-gray-700">Phone:</span>
                                                    <span>{phone}</span>
                                                </div>
                                            )}

                                            {socials?.[0]
                                                ?.filter((social) => social.label || social.linkurl)
                                                .map((social, index) => (
                                                    <a
                                                        key={index}
                                                        href={social.linkurl || "#"}
                                                        target={social.linkurl ? "_blank" : undefined}
                                                        rel="noreferrer"
                                                        className="flex items-center gap-2 font-medium hover:underline"
                                                    >
                                                        {social.icon}
                                                        <span className="break-all">
                                                            {social.label || social.linkurl}
                                                        </span>
                                                    </a>
                                                ))}
                                        </div>
                                    </section>
                                )}

                                {hobbies[0].length > 0 && (
                                    <section>
                                        <SectionTitle title="Interests" />

                                        <div className="flex flex-wrap gap-2">
                                            {hobbies[0]
                                                .filter((item) => item.trim())
                                                .map((item, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-full px-3 py-1 text-[11px] text-white font-semibold "
                                                        style={{ backgroundColor: primaryColor }}
                                                    >
                                                        {item.trim()}
                                                    </span>
                                                ))}
                                        </div>
                                    </section>
                                )}
                            </aside>
                        </div>

                    </main>
                </div>
            </div>

            <div className="flex w-full gap-2 py-5">
                <div className="flex items-center gap-2">
                    <FormControl size="small" fullWidth sx={{ minWidth: 100, maxWidth: 160, backgroundColor: "white" }}>
                        <InputLabel id="color-picker-label">Color</InputLabel>

                        <Select
                            labelId="color-picker-label"
                            id="color-picker"
                            value={colors || "#1e293b"}
                            label="Color"
                            onChange={(e) => handleColorChange(e.target.value)}
                            renderValue={(selected) => {
                                const selectedColor = colorPicker.find(
                                    (color) => color.name === selected
                                );

                                return (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: "50%",
                                                backgroundColor: selectedColor?.name,
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                        {selectedColor?.label}
                                    </Box>
                                );
                            }}
                        >
                            {colorPicker.map((color) => (
                                <MenuItem key={color.name} value={color.name}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Box
                                            sx={{
                                                width: 14,
                                                height: 14,
                                                borderRadius: "50%",
                                                backgroundColor: color.name,
                                                border: "1px solid #ccc",
                                            }}
                                        />
                                        {color.label}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="flex items-center gap-2">
                    <FormControl size="small" fullWidth sx={{ minWidth: 100, maxWidth: 160, backgroundColor: "white" }}>
                        <InputLabel id="font-picker-label">Font Style</InputLabel>

                        <Select
                            labelId="font-picker-label"
                            id="font-picker"
                            value={selectedFont}
                            label="Font Style"
                            onChange={(e) => setSelectedFont(e.target.value)}
                        >
                            {fontPicker.map((font) => (
                                <MenuItem
                                    key={font.value}
                                    value={font.value}
                                    sx={{ fontFamily: font.value }}
                                >
                                    {font.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="w-full flex items-center gap-3 md:justify-end">
                    <IconButton
                        onClick={handleMenuOpen}
                        aria-label="Draft options"
                        aria-controls={draftMenuOpen ? "draft-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={draftMenuOpen ? "true" : undefined}
                        sx={{
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "6px",
                            "&:hover": {
                                backgroundColor: "#334155",
                                color: "white",
                            },
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>

                    <Menu
                        id="draft-menu"
                        anchorEl={anchorEl}
                        open={draftMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                    >
                        <MenuItem
                            onClick={handleLoadDraft}
                            disabled={draftLoading || loading}
                        >
                            <ListItemIcon>
                                {draftLoading ? (
                                    <CircularProgress size={18} />
                                ) : (
                                    <FolderOpenOutlinedIcon fontSize="small" />
                                )}
                            </ListItemIcon>

                            <ListItemText>
                                {draftLoading ? "Loading..." : "Load Draft"}
                            </ListItemText>
                        </MenuItem>

                        <MenuItem
                            onClick={handleSaveDraft}
                            disabled={loading || draftLoading}
                        >
                            <ListItemIcon>
                                {loading ? (
                                    <CircularProgress size={18} />
                                ) : (
                                    <SaveOutlinedIcon fontSize="small" />
                                )}
                            </ListItemIcon>

                            <ListItemText>
                                {loading ? "Saving..." : "Save Draft"}
                            </ListItemText>
                        </MenuItem>

                        <MenuItem
                            onClick={handleImportClick}
                            disabled={draftLoading || loading}
                        >
                            <ListItemIcon>
                                <FileUploadIcon fontSize="small" />
                            </ListItemIcon>

                            <ListItemText>Import JSON</ListItemText>
                        </MenuItem>

                        {Number(profileCompleteness) === 100 && (
                            <MenuItem
                                onClick={handleExportClick}
                                disabled={draftLoading || loading}
                            >
                                <ListItemIcon>
                                    <FileDownloadIcon fontSize="small" />
                                </ListItemIcon>

                                <ListItemText>Export JSON</ListItemText>
                            </MenuItem>
                        )}
                        <ReactToPrint
                            trigger={() => (
                                <MenuItem
                                    sx={{
                                        display: {
                                            xs: "flex",
                                            sm: "none",
                                        },
                                    }}
                                    disabled={draftLoading || loading}
                                >
                                    <ListItemIcon>
                                        <PrintOutlinedIcon fontSize="small" />
                                    </ListItemIcon>

                                    <ListItemText>Print and Download</ListItemText>
                                </MenuItem>
                            )}
                            content={() => targetRef.current}
                            onAfterPrint={handleMenuClose}
                        />
                    </Menu>

                    <input
                        ref={importInputRef}
                        type="file"
                        accept=".json,application/json"
                        onChange={importJSON}
                        className="hidden"
                    />

                    <ReactToPrint
                        trigger={() => (
                            <button className="hidden h-[40px] md:block bg-slate-800 transition hover:bg-slate-700 text-white px-4 py-3 rounded-md text-sm whitespace-nowrap">
                                Print and Download
                            </button>
                        )}
                        content={() => targetRef.current}
                    />
                </div>
            </div>
        </div>
    );
}

export default Template3;