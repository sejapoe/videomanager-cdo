import ReactDOM from 'react-dom/client'
import './index.css'
import {AppProvider} from "./providers/app.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppProvider/>
)
