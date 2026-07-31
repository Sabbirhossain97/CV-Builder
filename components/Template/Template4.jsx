import React, { useContext, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { DataContext } from "../../pages/CVBuilder";
import {
    parseDescription,
    parseProjectDetails,
    parseActivityDetails,
    dateConverter,
} from "../helpers/helpers";
import { fontPicker } from '../helpers/helpers';
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

function Template4({ save, load, loading, exportJSON, importJSON, draftLoading }) {
    const targetRef = useRef();
    const importInputRef = useRef(null);

    const {
        personalInformation,
        summary,
        employment,
        education,
        socials,
        skills,
        project,
        extraCurricular,
        certification,
        languages,
        hobbies,
        reference,
        skillExpLevel,
        langLevel,
        profileCompleteness
    } = useContext(DataContext);

    const [
        {
            firstname,
            lastname,
            email,
            phone,
            country,
            city,
            occupation,
            postalcode,
        } = {},
    ] = personalInformation?.[0] || [{}];
    const [selectedFont, setSelectedFont] = useState("Inter, sans-serif");

    const handleFontChange = (font) => {
        setSelectedFont(font);
    };

    const [{ summary: about } = {}] = summary?.[0] || [{}];
    const [showExpLevel] = skillExpLevel || [];
    const [showLangLevel] = langLevel || [];

    const hasData = (items, fields = []) =>
        items?.[0]?.some((item) => fields.some((field) => item?.[field]));

    const SectionTitle = ({ children }) => (
        <h2 className="mt-6 border-b border-gray-300 pb-1 text-[15px] font-bold uppercase tracking-wide text-gray-900">
            {children}
        </h2>
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
                className="mx-auto h-screen overflow-auto bg-white print:h-auto print:min-h-0 print:overflow-visible print:shadow-none"
            >
                <div className="w-full min-w-[794px] min-h-[1123px] bg-white shadow-lg print:shadow-none">
                    <main style={{ fontFamily: selectedFont }} className="mx-auto min-h-[1120px] w-full max-w-[900px] bg-white px-10 py-10 font-serif text-[13px] leading-[1.45] text-gray-800">
                        {/* Header */}
                        <header className="text-center">
                            <h1 className="text-[30px] font-bold uppercase tracking-wide text-gray-950">
                                {firstname || lastname
                                    ? `${firstname || ""} ${lastname || ""}`.trim()
                                    : "Your Name"}
                            </h1>

                            {occupation && (
                                <p className="mt-1 text-[15px] font-medium text-gray-700">
                                    {occupation}
                                </p>
                            )}

                            <div className="mt-2 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[12px] text-gray-700">
                                {email && <span>{email}</span>}
                                {email && phone && <span>|</span>}
                                {phone && <span>{phone}</span>}

                                {(city || country || postalcode) && (
                                    <>
                                        {(email || phone) && <span>|</span>}
                                        <span>
                                            {[city, country, postalcode].filter(Boolean).join(", ")}
                                        </span>
                                    </>
                                )}
                            </div>

                            {socials?.[0]?.some((social) => social.label || social.linkurl) && (
                                <div className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-1 text-[12px] text-gray-700">
                                    {socials[0]
                                        .filter((social) => social.label || social.linkurl)
                                        .map((social, index) => (
                                            <React.Fragment key={index}>
                                                {index > 0 && <span>|</span>}
                                                <a
                                                    href={social.linkurl || "#"}
                                                    target={social.linkurl ? "_blank" : undefined}
                                                    rel="noreferrer"
                                                    className="break-all hover:underline"
                                                >
                                                    {social.label || social.linkurl}
                                                </a>
                                            </React.Fragment>
                                        ))}
                                </div>
                            )}
                        </header>

                        {/* Summary */}
                        {about && (
                            <section>
                                <SectionTitle>Professional Summary</SectionTitle>
                                <p className="mt-2 break-words text-justify">{about}</p>
                            </section>
                        )}

                        {/* Skills */}
                        {hasData(skills, ["skill", "level"]) && (
                            <section>
                                <SectionTitle>Skills</SectionTitle>

                                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                                    {skills[0]
                                        .filter((item) => item.skill)
                                        .map((item, index) => (
                                            <span key={index}>
                                                {item.skill}
                                                {showExpLevel && item.level ? ` (${item.level})` : ""}
                                                {index !==
                                                    skills[0].filter((item) => item.skill).length - 1 && ","}
                                            </span>
                                        ))}
                                </div>
                            </section>
                        )}

                        {/* Experience */}
                        {hasData(employment, ["employer", "jobtitle", "description"]) && (
                            <section>
                                <SectionTitle>Professional Experience</SectionTitle>

                                <div className="mt-2 space-y-4">
                                    {employment[0]
                                        .filter(
                                            (job) => job.employer || job.jobtitle || job.description
                                        )
                                        .map((job, index) => (
                                            <div key={index}>
                                                {(job.jobtitle || job.employer) && (
                                                    <div className="flex flex-wrap justify-between gap-2">
                                                        <h3 className="font-bold text-gray-950">
                                                            {[job.jobtitle, job.employer]
                                                                .filter(Boolean)
                                                                .join(" | ")}
                                                        </h3>

                                                        {(job.startdate || job.enddate) && (
                                                            <p className="font-medium text-gray-700">
                                                                {dateConverter(
                                                                    job.startdate,
                                                                    job.enddate,
                                                                    job.ongoing
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}

                                                {job.description &&
                                                    job.description !== "<p><br></p>" && (
                                                        <ul className="mt-1 list-disc space-y-1 pl-5">
                                                            {parseDescription(job.description)}
                                                        </ul>
                                                    )}
                                            </div>
                                        ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        {hasData(education, ["degree", "institution", "institutioncity"]) && (
                            <section>
                                <SectionTitle>Education</SectionTitle>

                                <div className="mt-2 space-y-3">
                                    {education[0]
                                        .filter(
                                            (edc) =>
                                                edc.degree ||
                                                edc.institution ||
                                                edc.institutioncity
                                        )
                                        .map((edc, index) => (
                                            <div key={index}>
                                                <div className="flex flex-wrap justify-between gap-2">
                                                    <h3 className="font-bold text-gray-950">
                                                        {edc.degree}
                                                    </h3>

                                                    {(edc.startdate || edc.enddate) && (
                                                        <p className="font-medium text-gray-700">
                                                            {edc.startdate}
                                                            {edc.startdate && edc.enddate ? " - " : ""}
                                                            {edc.ongoing
                                                                ? "Present"
                                                                : edc.enddate || ""}
                                                        </p>
                                                    )}
                                                </div>

                                                {(edc.institution || edc.institutioncity) && (
                                                    <p>
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

                        {/* Projects */}
                        {hasData(project, ["projecttitle", "description"]) && (
                            <section>
                                <SectionTitle>Projects</SectionTitle>

                                <div className="mt-2 space-y-4">
                                    {project[0]
                                        .filter((pro) => pro.projecttitle || pro.description)
                                        .map((pro, index) => (
                                            <div key={index}>
                                                <div className="flex flex-wrap justify-between gap-2">
                                                    {pro.projecttitle && (
                                                        <h3 className="font-bold text-gray-950">
                                                            {pro.projecttitle}
                                                        </h3>
                                                    )}

                                                    {(pro.startdate || pro.enddate) && (
                                                        <p className="font-medium text-gray-700">
                                                            {dateConverter(
                                                                pro.startdate,
                                                                pro.enddate,
                                                                pro.ongoing
                                                            )}
                                                        </p>
                                                    )}
                                                </div>

                                                {(pro.liveurl || pro.githuburl) && (
                                                    <div className="mt-1 flex flex-wrap gap-x-2 text-[12px]">
                                                        {pro.liveurl && (
                                                            <a
                                                                href={pro.liveurl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="break-all hover:underline"
                                                            >
                                                                Live: {pro.liveurl}
                                                            </a>
                                                        )}

                                                        {pro.githuburl && (
                                                            <a
                                                                href={pro.githuburl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="break-all hover:underline"
                                                            >
                                                                GitHub: {pro.githuburl}
                                                            </a>
                                                        )}
                                                    </div>
                                                )}

                                                {Array.isArray(pro.technologies) &&
                                                    pro.technologies.length > 0 && (
                                                        <p className="mt-1">
                                                            <span className="font-bold">
                                                                Technologies:
                                                            </span>{" "}
                                                            {pro.technologies.join(", ")}
                                                        </p>
                                                    )}

                                                {pro.description && (
                                                    <ul className="mt-1 list-disc space-y-1 pl-5">
                                                        {parseProjectDetails(pro.description)}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </section>
                        )}

                        {/* Certifications */}
                        {hasData(certification, [
                            "title",
                            "organization",
                            "issueDate",
                            "credentialUrl",
                            "description",
                        ]) && (
                                <section>
                                    <SectionTitle>Certifications</SectionTitle>

                                    <div className="mt-2 space-y-3">
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
                                                <div key={index}>
                                                    <div className="flex flex-wrap justify-between gap-2">
                                                        {cert.title && (
                                                            <h3 className="font-bold text-gray-950">
                                                                {cert.title}
                                                            </h3>
                                                        )}

                                                        {cert.issueDate && (
                                                            <p className="font-medium text-gray-700">
                                                                {cert.issueDate}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {cert.organization && <p>{cert.organization}</p>}

                                                    {cert.credentialUrl && (
                                                        <a
                                                            href={cert.credentialUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="break-all text-gray-700 hover:underline"
                                                        >
                                                            {cert.credentialUrl}
                                                        </a>
                                                    )}

                                                    {cert.description && (
                                                        <p className="mt-1 break-words">
                                                            {cert.description}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </section>
                            )}



                        {/* Extra Curricular */}
                        {hasData(extraCurricular, [
                            "role",
                            "title",
                            "institution",
                            "description",
                        ]) && (
                                <section>
                                    <SectionTitle>Extra Curricular Activities</SectionTitle>

                                    <div className="mt-2 space-y-4">
                                        {extraCurricular[0]
                                            .filter(
                                                (item) =>
                                                    item.role ||
                                                    item.title ||
                                                    item.institution ||
                                                    item.description
                                            )
                                            .map((item, index) => (
                                                <div key={index}>
                                                    <div className="flex flex-wrap justify-between gap-2">
                                                        <h3 className="font-bold text-gray-950">
                                                            {[item.role, item.title]
                                                                .filter(Boolean)
                                                                .join(" - ")}
                                                        </h3>

                                                        {(item.startdate || item.enddate) && (
                                                            <p className="font-medium text-gray-700">
                                                                {dateConverter(
                                                                    item.startdate,
                                                                    item.enddate,
                                                                    item.ongoing
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>

                                                    {item.institution && <p>{item.institution}</p>}

                                                    {item.description && (
                                                        <ul className="mt-1 list-disc space-y-1 pl-5">
                                                            {parseActivityDetails(item.description)}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </section>
                            )}

                        {/* Languages */}
                        {hasData(languages, ["name", "level"]) && (
                            <section>
                                <SectionTitle>Languages</SectionTitle>

                                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                                    {languages[0]
                                        .filter((language) => language.name)
                                        .map((language, index) => (
                                            <span key={index}>
                                                {language.name}
                                                {!showLangLevel && language.level
                                                    ? ` (${language.level})`
                                                    : ""}
                                                {index !==
                                                    languages[0].filter((language) => language.name)
                                                        .length -
                                                    1 && ","}
                                            </span>
                                        ))}
                                </div>
                            </section>
                        )}

                        {/* Hobbies */}
                        {hobbies?.[0]?.length > 0 && (
                            <section>
                                <SectionTitle>Hobbies & Interests</SectionTitle>

                                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                                    {hobbies[0]
                                        .filter((item) => item?.trim())
                                        .map((item, index) => (
                                            <span key={index}>
                                                {item.trim()}
                                                {index !==
                                                    hobbies[0].filter((item) => item?.trim()).length -
                                                    1 && ","}
                                            </span>
                                        ))}
                                </div>
                            </section>
                        )}

                        {/* References */}
                        {hasData(reference, [
                            "referrername",
                            "position",
                            "organization",
                            "email",
                            "phone",
                        ]) && (
                                <section>
                                    <SectionTitle>References</SectionTitle>

                                    <div className="mt-2 space-y-3">
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
                                                <div key={index}>
                                                    <h3 className="font-bold text-gray-950">
                                                        {ref.referrername}
                                                    </h3>

                                                    {(ref.position || ref.organization) && (
                                                        <p>
                                                            {[ref.position, ref.organization]
                                                                .filter(Boolean)
                                                                .join(" | ")}
                                                        </p>
                                                    )}

                                                    <div className="text-gray-700">
                                                        {ref.address && <p>{ref.address}</p>}
                                                        {ref.email && <p>{ref.email}</p>}
                                                        {ref.phone && <p>{ref.phone}</p>}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </section>
                            )}
                    </main>
                </div>
            </div>

            <div className="flex w-full gap-2 py-5">
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

export default Template4;