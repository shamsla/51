import { PAGES } from 'Constants'
import { AppContext } from 'Context'
import { useContext } from 'react'

import Credentials from 'Pages/Credentials'

export default function PagesMain() {
    const {
        state: { activePage },
        actions: { setActivePage },
    } = useContext(AppContext)

    switch (activePage) {
        case PAGES.CREDENTIALS:
            return <Credentials />
        default:
            setActivePage(PAGES.CREDENTIALS)
    }

    return null
}
