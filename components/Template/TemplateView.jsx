import Template from "./Template";
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
import Template2 from './Template2';
import Template3 from "./Template3";

const TemplateView = () => {
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
  const [tabValue, setTabValue] = React.useState('template_1');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorChange = (name) => {
    setColors(name)
  }
  return (
    <div className="h-full w-full">
      <div className="relative bg-gradient-to-t from-gray-200 to-blue-200">
        <div className="absolute top-5 left-1/2 z-20 -translate-x-1/2">
          <Box
            sx={{
              borderRadius: 2,
              px: 1,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="CV template selection"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Template 1" value="template_1" />
              <Tab label="Template 2" value="template_2" />
              <Tab label="Template 3" value="template_3" />
            </Tabs>
          </Box>
        </div>
        {tabValue === "template_1" ? <Template /> : tabValue === "template_2" ? <Template2 /> : <Template3/>}
          <Tooltip title="Form" placement="top">
            <div
              onClick={() => setShowTemplate(!showTemplate)}
              className="scale-75 sm:scale-100 z-100 p-[15px] rounded-full bg-blue-500 hover:bg-blue-400 cursor-pointer fixed bottom-[10px] sm:bottom-[25px] sm:right-[15px] right-[5px] custom-end:hidden">
              <Form />
            </div>
          </Tooltip>
      </div>
    </div>
  );
};

export default TemplateView;
