import { createGlobalStyle } from 'styled-components'

const styles = createGlobalStyle`
    * {
        font-family: Poppins, sans-serif !important;
    }

    html, body, #root {
        min-height: 100vh !important;
    }

    body {
        background: #EDF2F7 !important;
    }

    button {
        -webkit-tap-highlight-color: transparent;
    }

`

export default styles
