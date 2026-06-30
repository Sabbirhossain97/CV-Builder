import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

export const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
        "& .MuiSwitch-thumb": {
            width: 15,
        },
        "& .MuiSwitch-switchBase.Mui-checked": {
            transform: "translateX(9px)",
        },
    },
    "& .MuiSwitch-switchBase": {
        padding: 2,
        "&.Mui-checked": {
            transform: "translateX(12px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor:
                    theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(["width"], {
            duration: 200,
        }),
    },
    "& .MuiSwitch-track": {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === "dark"
                ? "rgba(255,255,255,.35)"
                : "rgba(0,0,0,.25)",
        boxSizing: "border-box",
    },
}));

export const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'july', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const parseDescription = (description) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(description, 'text/html');
    const listItems = doc.querySelectorAll('li');
    return Array.from(listItems).map((item, index) => (
        <li key={index}>{item.textContent}</li>
    ));
};

export const parseProjectDetails = (projectDetails) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(projectDetails, 'text/html');
    const listItems = doc.querySelectorAll('li');
    return Array.from(listItems).map((item, index) => {
        return <div key={index} className="ql-snow"><li key={index} dangerouslySetInnerHTML={{ __html: item.innerHTML }} /></div>
    });
};

export const parseActivityDetails = (activityDettails) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(activityDettails, 'text/html');
    const listItems = doc.querySelectorAll('li');
    return Array.from(listItems).map((item, index) => {
        return <div key={index} className="ql-snow"><li key={index} dangerouslySetInnerHTML={{ __html: item.innerHTML }} /></div>
    });
};

export const colorPicker = [
    {
        name: "#64748b",
    },
    {
        name: "#eab308",
    },
    {
        name: "#22c55e",
    },
    {
        name: "#1e40af",
    },
    {
        name: "#14b8a6",
    },
    {
        name: "#6b21a8",
    },
    {
        name: "#1e293b",
    },
]

export const dateConverter = (startDate, endDate, status) => {
    const convertedStartDate = `${months[Number(startDate.split("-")[1]) - 1]} ${startDate.split("-")[0]}`;
    let convertedEndDate = endDate;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const convertedCurrentDate = `${year}-${month}`;
    if(status){
        convertedEndDate = "Present"
    } else if(convertedCurrentDate === convertedEndDate) {
        convertedEndDate = "Present"
    } else if (convertedEndDate !== "") {
        convertedEndDate = `${months[Number(endDate.split("-")[1]) - 1]} ${endDate.split("-")[0]}`
    }

    return `${convertedStartDate} - ${convertedEndDate}`
}

export const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: 300,
        sm: 400
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};