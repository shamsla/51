import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import CreatePassword from 'Components/Pages/Dashboard/CreatePassword'
import RetrievePassword from 'Components/Pages/Dashboard/RetrievePassword'
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
            <TabList bg="gray.200" borderRadius="lg" padding="8px" mb="4rem">
                <Tab borderRadius="lg">Create</Tab>
                <Tab borderRadius="lg">Retrieve</Tab>
                <Tab borderRadius="lg">Encrypt</Tab>
            </TabList>
            <TabPanels>
                <TabPanel padding={0}>
                    {activeTab === 0 && <CreatePassword />}
                </TabPanel>
                <TabPanel padding={0}>
                    {activeTab === 1 && <RetrievePassword />}
                </TabPanel>
                <TabPanel padding={0}>
                    <p>...</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
