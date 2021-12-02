import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import CreatePassword from 'Components/Pages/Dashboard/CreatePassword'
import { useState } from 'react'

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <Tabs
            onChange={index => setActiveTab(index)}
            isFitted
            variant="soft-rounded"
            colorScheme="blue"
        >
            <TabList mb="4rem">
                <Tab>Create</Tab>
                <Tab>Retrieve</Tab>
                <Tab>Encrypt</Tab>
            </TabList>
            <TabPanels>
                <TabPanel padding={0}>
                    {activeTab === 0 && <CreatePassword />}
                </TabPanel>
                <TabPanel padding={0}>
                    <p>two!</p>
                </TabPanel>
                <TabPanel padding={0}>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
