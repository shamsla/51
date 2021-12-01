import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import CreatePassword from 'Components/Pages/Dashboard/CreatePassword'

export default function Dashboard() {
    return (
        <Tabs isFitted variant="soft-rounded" colorScheme="blue">
            <TabList mb="4rem">
                <Tab>Create</Tab>
                <Tab>Retrieve</Tab>
                <Tab>Encrypt</Tab>
            </TabList>
            <TabPanels>
                <TabPanel padding={0}>
                    <CreatePassword />
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
