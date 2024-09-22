// Style
import './index.scss';

// Metadata
import { Helmet } from "react-helmet-async";

// Components
import Sidebar from '../../../components/Sidebar';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/state';
import { setSelectedTemplateType } from './templatesSlice';

const TemplatesPageLayout = () => {
    const dispatch = useAppDispatch();
    const selectedTemplate = useAppSelector((state) => state.templatesSlice.selectedTemplateType);

    return (
        <div className="private-page templates-page">
            <Helmet>
                <meta name="description" content="templates auto chat bot" />
                <title>Templates - AutoChatBot</title>
            </Helmet>

            <Sidebar title='Templates'>
                <Sidebar.Group>
                    <Sidebar.Item focused={selectedTemplate === "All templates"} onClick={() => dispatch(setSelectedTemplateType("All templates"))}>All templates</Sidebar.Item>
                    <Sidebar.Item focused={selectedTemplate === "Instagram"} onClick={() => dispatch(setSelectedTemplateType("Instagram"))}>Instagram</Sidebar.Item>
                </Sidebar.Group>
            </Sidebar>

            <div className='templates-page__content'></div>
        </div>
    );
};

export default TemplatesPageLayout;